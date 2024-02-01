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

## 개발 데이터 init

``` sh 
sh migration/migrate_dev.sh
```
