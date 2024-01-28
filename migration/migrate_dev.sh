IMAGE_NAME_WITH_TAG=$(sh $(pwd)/migration/build_image.sh)

docker run \
  --rm \
  --network hell-network \
  -v $(pwd)/migration/index.mjs:/app/index.mjs \
  -v $(pwd)/migration/.env.development:/app/.env.development \
  -v $(pwd)/migration/config:/app/config \
  -v $(pwd)/migration/dev:/app/dev \
  -v $(pwd)/migration/prod:/app/prod \
  -w /app $IMAGE_NAME_WITH_TAG \
  npm run init:dev