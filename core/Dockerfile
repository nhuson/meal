FROM bitnami/node:10.15.0-r7 as builder

# Create app directory
WORKDIR /meal-api

# Install app dependencies
COPY package.json /meal-api
RUN npm install --production --unsafe

# Bundle app source
COPY . /meal-api

FROM bitnami/node:10.15.0-r7-prod
RUN npm install --global pm2

# Add user so we dont run our app as root
RUN groupadd -r node && useradd -r -g node node \
    && mkdir -p /home/node/meal-api \
    && chown -R node:node /home/node

WORKDIR /home/node/meal-api
COPY --from=builder /meal-api .

USER node
EXPOSE 3000

CMD ["npm", "run", "dev"]