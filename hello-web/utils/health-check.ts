import * as http from 'http';

function checkHealth(url: string): void {
  http
    .get(url, (res: http.IncomingMessage) => {
      let data = '';

      res.on('data', (chunk: Buffer) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`HTTP Health Check for ${url} - OK`);
        } else {
          console.log(`HTTP Health Check for ${url} - Failed (Status Code: ${res.statusCode})`);
          process.exit(1);
        }
      });
    })
    .on('error', (error: Error) => {
      console.error('Error making request:', error.message);
      process.exit(1);
    });
}

const url: string = process.argv[2];

if (!url) {
  console.error('Usage: node health-check.js <URL>');
  process.exit(1);
}

checkHealth(url);
