FROM node:14.1.0-alpine3.10 as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.13.12-alpine

COPY --from=node /usr/src/app/dist/paypal-fend /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf