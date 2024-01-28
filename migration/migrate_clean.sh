IMAGE_NAME_WITH_TAG=$(sh $(pwd)/migration/build_image.sh)

docker run \
  --rm \
  --network hell-network \
  -v $(pwd)/migration/index.mjs:/app/index.mjs \
  -v $(pwd)/migration/.env.development:/app/.env.development \
  -w /app $IMAGE_NAME_WITH_TAG \
  npm run clean