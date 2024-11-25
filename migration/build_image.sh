VERSION=1.0.0
IMAGE_NAME="hello-migration-image"
IMAGE_NAME_WITH_TAG="${IMAGE_NAME}:${VERSION}"

# 위에 명시한 버전의 이미지가 존재하지 않으면 이미지 빌드
if !(docker image inspect $IMAGE_NAME_WITH_TAG &> /dev/null); then
  docker build -t $IMAGE_NAME_WITH_TAG ./migration
fi

echo $IMAGE_NAME_WITH_TAG