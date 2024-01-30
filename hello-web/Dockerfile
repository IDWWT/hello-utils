ARG NODE_VERSION=20.11.0

# base stage
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app
EXPOSE 13010

RUN npm install -g npm@10.4.0

# develop stage
FROM base as development
ENV NODE_ENV development
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
COPY . .
CMD ["npm", "run", "dev"]

# production stage
FROM base as production
ENV NODE_ENV production
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
COPY . .
CMD ["npm", "run", "start"]