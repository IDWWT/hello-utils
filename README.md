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

## python API 테스트 실행
``` sh
docker exec -it hello-user python /app/test_graphql.py
```