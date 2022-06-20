FROM node:16.15.1-alpine3.16 as build-stage

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --silent

COPY . .

RUN yarn build

FROM nginx:1.17-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]