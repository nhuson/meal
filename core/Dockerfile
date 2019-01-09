FROM node:carbon-alpine
RUN mkdir -p /home/node/meal-api/node_modules && chown -R node:node /home/node/meal-api
WORKDIR /home/node/meal-api
COPY package*.json ./
RUN apk update \
    && apk upgrade \
    && apk add --no-cache --virtual .build-deps \
    binutils-gold \
    curl \
    g++ \
    gcc \
    gnupg \
    libgcc \
    linux-headers \
    make \
    python \
    bash git openssh \
    && npm install \
    && npm install -g nodemon \
    && npm install babel-cli babel-preset-env babel-preset-es2016 babel-preset-stage-0 --save-dev
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 3000