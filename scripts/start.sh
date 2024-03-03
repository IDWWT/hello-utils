# data 디렉토리 생성
source "$(pwd)/scripts/create-data-directory.sh"

# https 인증서 생성
source "$(pwd)/scripts/create-certificates.sh"

# .env 파일 다운로드
doppler secrets download --no-file --format docker --project hello-bff --config dev > ./hello-bff/.env
doppler secrets download --no-file --format docker --project hello-code --config dev > ./hello-code/.env
doppler secrets download --no-file --format docker --project hello-user --config dev > ./hello-user/.env
doppler secrets download --no-file --format docker --project hello-web --config dev > ./hello-web/.env
doppler secrets download --no-file --format docker --project hello-db --config dev > ./mysql/.env

# docker comopse 실행
docker-compose watch