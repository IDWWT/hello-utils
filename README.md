# hello-utils
유틸리티 함수 아카이빙 서비스

## 준비물

### Doppler

1. Doppler 설치

    ```sh
    # Prerequisite. gnupg is required for binary signature verification
    brew install gnupg

    # Next, install using brew (use `doppler update` for subsequent updates)
    brew install dopplerhq/cli/doppler
    ```

2. Doppler 로그인

    ```sh
    doppler login
    ```

### Nginx

1. `/etc/hosts` 파일 열기

    ```sh
    sudo vi /etc/hosts
    ```

2. 다음 설정을 복사 붙여넣기

    ```sh
    # hello-utils
    127.0.0.1 web.hello-utils.wiki
    127.0.0.1 code.hello-utils.wiki
    127.0.0.1 user.hello-utils.wiki
    127.0.0.1 bff.hello-utils.wiki
    ```

## 실행방법

### 로컬 개발환경 실행
```sh
# start project
./scripts/start.sh

# stop project
./scripts/stop.sh

# view logs
docker compose logs -f <service-name>
```

### python API 테스트 실행
``` sh
docker exec -it hello-user python /app/test_graphql.py
```

## 참고사항

### 로컬 개발환경 포트

* Nginx 13000 (hello-nginx)
* MySQL 13001 (hello-db)
* Redis 13002 (hello-redis)
* 프론트 13010 (hello-web)
* 백엔드 자바 13020, 13021 (hello-user)
* 백엔드 파이썬 13030 (hello-user), 13031 (hello-bff)