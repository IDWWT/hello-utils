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

## 실행방법

```sh
# start project
./scripts/start.sh

# stop project
./scripts/stop.sh

# view logs
docker compose logs -f <service-name>
```

## 개발 데이터 init

``` sh 
sh migration/migrate_dev.sh
```
