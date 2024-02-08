# build stage
FROM gradle:jdk17 as build

WORKDIR /build

# 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
# COPY build.gradle settings.gradle /build/
# RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

# 빌더 이미지에서 애플리케이션 빌드
COPY . /build
RUN gradle build -x test --parallel

# development stagex
FROM openjdk:17.0-slim as development

WORKDIR /app
COPY --from=build /build/build/libs/hellocode-*.jar .

EXPOSE 13020 13021

CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-Xdebug", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000", "-jar", "./hellocode-0.0.1-SNAPSHOT.jar"]

# production stage
FROM openjdk:17.0-slim as production

WORKDIR /app
COPY --from=build /build/build/libs/hellocode-*.jar .

EXPOSE 13020 13021

CMD ["java", "-jar", "-Djava.security.egd=file:/dev/./urandom", "-Dsun.net.inetaddr.ttl=0", "hellocode-0.0.1-SNAPSHOT.jar"]