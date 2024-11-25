ARG NODE_VERSION=20.11.0

# transpile http check utility
FROM node:${NODE_VERSION}-alpine as transpile
WORKDIR /transpile
COPY ./utils/health-check.ts /transpile
RUN npm install -g npm@10.4.0 typescript && \
    npm install -D @types/node && \
    tsc ./health-check.ts

# base stage
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
EXPOSE 13010
RUN mkdir /utils
COPY --from=transpile /transpile/health-check.js /utils
RUN npm install -g npm@10.4.0

# develop stage
FROM base as development
ENV NODE_ENV development
CMD ["npm", "run", "dev"]
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .

# production stage
FROM base as production
ENV NODE_ENV production
ENTRYPOINT ["doppler", "run", "--"]
CMD ["npm", "run", "build", "&&", "npm", "run", "start"]
# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY . .