FROM node:alpine

WORKDIR ./

COPY package*.json ./
COPY tsconfig*.json ./
COPY .eslintrc ./
COPY ./src ./src

RUN yarn lint
RUN yarn Build

CMD yarn start
