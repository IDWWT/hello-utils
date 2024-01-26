import mysql from 'mysql2/promise';
import path from 'path';
import fs from  'fs';
import dotenv from 'dotenv';
import crypto from 'crypto';

console.group(`migration start: ${process.argv[2]}`);

const ENV_PATH = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({ path: ENV_PATH });

console.log('MYSQL_HOST', process.env.MYSQL_HOST);
console.log('MYSQL_PORT', process.env.MYSQL_PORT);
console.log('MYSQL_USER', process.env.MYSQL_USER);
console.log('MYSQL_ROOT_PASSWORD', process.env.MYSQL_ROOT_PASSWORD);
console.log('MYSQL_DATABASE', process.env.MYSQL_DATABASE);

const getRawSqlClient = async () => {
	const options = {
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_ROOT_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		multipleStatements: true,
	};

	const connection = await mysql.createConnection(options);
  console.log('connection created');
  return connection;
}

const generateChecksum = (str, algorithm, encoding) => {
	return crypto
		.createHash(algorithm || 'md5')
		.update(str, 'utf8')
		.digest(encoding || 'hex');
}

const checkIsDevFile = (fileName) => {
	return fileName.split('-')[0].split('_')[2] > 100;
}

const CONFIG_PATH = path.join('config');
const PROD_PATH = path.join('prod');
const DEV_PATH = path.join('dev');

const prodSqlFileNames = fs.readdirSync(PROD_PATH);
const devSqlFileNames = fs.readdirSync(DEV_PATH);

const migrateType = process.argv[2];
const connection = await getRawSqlClient();

if (migrateType === 'clean') {
	await connection.query(`DROP DATABASE ${process.env.MYSQL_DATABASE}`);
	await connection.query(`CREATE DATABASE ${process.env.MYSQL_DATABASE}`);
} else {
	await connection.execute(fs.readFileSync(path.join(CONFIG_PATH, '0_0_1-create_migration_table.sql')).toString());

	const [rows, fields] = await connection.query(`
		SELECT 
			  migration_file_name AS migrationFileName
			, checksum AS checksum
		FROM migration
	`);

	let migrationFileNames = [];

	try {
		if (migrateType === 'prod') {
			migrationFileNames = migrationFileNames.concat(prodSqlFileNames);
	
			rows.forEach((migratedFile) => {
				if (!checkIsDevFile(migratedFile.migrationFileName)) {
					if (!migrationFileNames.includes(migratedFile.migrationFileName)) {
						throw new Error(`migrated file ${migratedFile.migrationFileName} does not exist`);
					}
				}
			})
		} else if (migrateType === 'dev') {
			migrationFileNames = migrationFileNames.concat(prodSqlFileNames, devSqlFileNames);
	
			rows.forEach((migratedFile) => {
				if (!migrationFileNames.includes(migratedFile.migrationFileName)) {
					throw new Error(`migrated file ${migratedFile.migrationFileName} does not exist`);
				}
			})
		}
	} catch (err) {
		console.log(err.message);
	}
	
	migrationFileNames.sort();

	for (const fileName of migrationFileNames) {
		try {
			const isDevFile = checkIsDevFile(fileName);
			const fileFullPath = path.join(isDevFile ? DEV_PATH : PROD_PATH, fileName);
			const fileContent = fs.readFileSync(fileFullPath).toString();

			const [migrationId, migrationFileName] = fileName.split('-');
			const checkSum = generateChecksum(fileContent);

			const migratedFile = rows.find((migratedFile) => migratedFile.migrationFileName === fileName);
			if (migratedFile) {
				if (migratedFile.checksum !== checkSum) {
					throw new Error(`Fail: migrated file ${migratedFile.migrationFileName} is changed`);
				} else {
					continue;
				}
			}

			await connection.beginTransaction();

			await connection.query(fileContent);
			await connection.query(`INSERT INTO migration VALUES('${migrationId}', '${migrationFileName}', '${fileName}', '${checkSum}', CURRENT_TIMESTAMP)`)

			console.log('Success:', fileName)
			await connection.commit();
		} catch (err) {
			console.error(`Fail:`, fileName)
			console.error(err.message)
			await connection.rollback();
		}
	}
}

console.log(`migration end`);
console.groupEnd();

process.exit(1);
