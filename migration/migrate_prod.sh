docker build -t hello-migration-image ./migration
docker run \
  --rm \
  --network hell-network \
  -w /app hello-migration-image \
  npm run init:prod