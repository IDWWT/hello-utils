VERSION=1.0.0
IMAGE_NAME="hello-migration-image"
IMAGE_NAME_WITH_TAG="${IMAGE_NAME}:${VERSION}"

# Docker 이미지가 존재하는지 확인
if docker image inspect $IMAGE_NAME_WITH_TAG &> /dev/null; then
  echo "Image $IMAGE_NAME already exists."
else
  docker build -t $IMAGE_NAME_WITH_TAG ./migration
fi

docker run \
  --rm \
  --network hell-network \
  -v $(pwd)/migration/index.mjs:/app/index.mjs \
  -v $(pwd)/migration/.env.development:/app/.env.development \
  -v $(pwd)/migration/config:/app/config \
  -v $(pwd)/migration/dev:/app/dev \
  -v $(pwd)/migration/prod:/app/prod \
  -w /app $IMAGE_NAME_WITH_TAG \
  npm run init:prod