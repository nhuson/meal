FROM node:carbon-alpine
RUN mkdir -p /home/node/meal-app
WORKDIR /home/node/meal-app
COPY . .
ENV PATH /home/node/meal-app/node_modules/.bin:$PATH
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
    && npm audit fix
EXPOSE 8080