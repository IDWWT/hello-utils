# base stage
FROM nginx AS base
RUN apt-get update && \
    apt-get install -y procps vim systemctl
COPY ./config/nginx.conf /etc/nginx/conf.d/hello-utils.conf

# develop stage
FROM base AS development
RUN mkdir /etc/nginx/certs
COPY ./certs /etc/nginx/certs

# production stage에서는 volume으로 연결되어야 함
FROM base AS production