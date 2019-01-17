FROM node:carbon-alpine
RUN mkdir -p /home/node/meal-app/node_modules && chown -R node:node /home/node/meal-app
WORKDIR /home/node/meal-app
COPY package.json ./
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
    && npm install 
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 3000