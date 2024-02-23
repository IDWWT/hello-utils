# build stage
FROM gradle:jdk17 as build

WORKDIR /build

# 빌더 이미지에서 애플리케이션 빌드
COPY . /build
RUN --mount=type=cache,target=$USER_HOME/.gradle/caches \
    gradle build -x test --parallel

# development stagex
FROM openjdk:17.0-slim as development

WORKDIR /app
COPY --from=build /build/build/libs/hellocode-*.jar .

EXPOSE 13020 13021

CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-Xdebug", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000", "-jar", "-Dspring.profiles.active=local", "./hellocode-0.0.1-SNAPSHOT.jar"]

# production stage
FROM openjdk:17.0-slim as production

WORKDIR /app
COPY --from=build /build/build/libs/hellocode-*.jar .

EXPOSE 13020 13021

# Install Doppler CLI
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && \
    apt-get -y install doppler

ENTRYPOINT ["doppler", "run", "--"]
CMD ["java", "-jar", "-Dspring.profiles.active=prod","-Djava.security.egd=file:/dev/./urandom", "-Dsun.net.inetaddr.ttl=0", "hellocode-0.0.1-SNAPSHOT.jar"]