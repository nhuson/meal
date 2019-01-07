FROM node:carbon-alpine
RUN mkdir /home/app
WORKDIR /home/app
COPY package.json ./
RUN apk update \
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
    && npm install \
    && npm install babel-cli babel-preset-env babel-preset-es2016 babel-preset-stage-0 nodemon --save-dev
COPY . .
EXPOSE 8080