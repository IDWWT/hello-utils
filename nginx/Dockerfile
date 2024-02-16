FROM nginx

RUN apt-get update && \
    apt-get install -y procps vim systemctl

COPY ./config/nginx.conf /etc/nginx/conf.d/hello-utils.conf