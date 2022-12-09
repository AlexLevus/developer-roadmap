FROM node:12.7-alpine

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]