IMAGE=$(sh $(pwd)/migration/build_image.sh)

docker run \
  --rm \
  --network hell-network \
  -v $(pwd)/migration/index.mjs:/app/index.mjs \
  -v $(pwd)/migration/.env.development:/app/.env.development \
  -w /app $IMAGE \
  npm run clean