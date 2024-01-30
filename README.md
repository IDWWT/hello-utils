# hello-utils
유틸리티 함수 아카이빙 서비스

## 실행방법

```sh
# start project
docker-compose watch

# stop project
docker-compose down

# view logs
docker compose logs -f <service-name>
```

## db 마이그레이션 tool
### 사용법
```
# init prod
sh migration/migrate_prod.sh

# init dev
sh migration/migrate_dev.sh

# clean
sh migration/migrate_clean.sh
```

<br>

### 폴더 구조
```
hello-utils
  ├── ...
  ├── migration
  |    ├── ...
  |    ├── config
  |    ├── dev
  |    ├── prod
  |    ├── index.mjs
  |    └── ...
  └── ...
```

***config***
* 마이그레이션 실행시 가장 먼저 실행되어야 하는 스크립트를 저장하는 폴더
* 현재 **migration** 테이블을 생성하기 위한 **0_0_1-create_migration_table.sql** 파일만 하드코딩 되어 사용 중

***dev***
* 개발용 테스트 데이터를 조작하는 파일이 위치
* 프로덕션에서는 마이그레이션 되지 않는다.

***prod***
* DB 스키마를 조작하는 파일이 주로 위치
* 프로덕션까지 반영되어야 하는 데이터의 경우 해당 폴더에 생성한다.
* 프로덕션에서 마이그레이션 된다.

<br>

### 마이그레이션 버전관리
* 파일명은 아래와 같이 구성한다.
  * `연월_이슈번호_시퀀스-쿼리이름.sql`
* 파일명과 내용이 **migration** 테이블에서 관리된다.
  * 마이그레이션 된 파일을 수정한 경우 다음 마이그레이션에서 에러가 발생하므로 주의
  * 만약 이미 반영된 내용을 수정하고자 할 시에는 새로운 파일을 만들어 대응한다.

**예시**
- *prod* 폴더에 아래와 같은 파일이 있다.
```
2401_8_1-create_table_coworker.sql
```

* 연월은 YYMM 으로 작성
* 이슈번호를 통해 먼저 파일들을 그룹핑한다.
* 시퀀스는 1부터 올라가며 차례대로 마이그레이션 된다.

<br>

**dev** 폴더에 아래와 같은 파일이 있다.
```
2401_8_101-insert_table_coworker.sql
```

* 위 prod의 **2401_8_1-create_table_coworker.sql**와 같은 이슈의 테스트 데이터 이다.
* 이슈번호까지는 동일하게 구성하되, 시퀀스는 101부터 순차적으로 올라간다.
