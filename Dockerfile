# Build step #1: Build the React front end
FROM node:18-alpine as build-step

WORKDIR /app

COPY package*.json ./
COPY tailwind.config.js ./
COPY ./src ./src
COPY ./public ./public

RUN npm install

RUN npm run build


# Build step #2: Build the NGINX container
FROM nginx:stable-alpine

COPY --from=build-step /app/build /usr/share/nginx/html

COPY nginx.default.conf /etc/nginx/conf.d/default.conf
