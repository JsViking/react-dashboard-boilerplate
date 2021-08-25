FROM node:14.1-alpine AS app_dashboard

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

ARG BASE_URL=${BASE_URL}
ARG API_URL=${API_URL}
ARG MAIN_GRID_SOCKET_URL=${MAIN_GRID_SOCKET_URL}

RUN yarn run build

FROM nginx:stable as app_nginx
WORKDIR /app
COPY ./deploy_configs/nginx/templates/ /etc/nginx/templates/
COPY --from=app_dashboard /app/build/ ./
