FROM node:14.16.0-alpine3.13 AS build

WORKDIR /app

ENV NODE_ENV "development"
ENV PORT 80

RUN apk update \
    && apk upgrade

ADD package*.json ./

RUN npm install

ADD ./ ./

RUN npm run build

CMD [ "node", "./build/src/index.js" ]