# data 디렉토리 생성
source "$(pwd)/scripts/create-data-directory.sh"

# doppler project 설정 for DB env
doppler setup --project hello-db --config dev

# docker compose 실행
DOPPLER_TOKEN_HELLO_CODE="$(doppler configs tokens create --project hello-code --config dev web-dev-token --plain --max-age 1m)" \
DOPPLER_TOKEN_HELLO_WEB="$(doppler configs tokens create --project hello-web --config dev web-dev-token --plain --max-age 1m)" \
DOPPLER_TOKEN_HELLO_USER="$(doppler configs tokens create --project hello-user --config dev web-dev-token --plain --max-age 1m)" \
doppler run -- docker-compose watch