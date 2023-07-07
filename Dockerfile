FROM node:latest

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn prisma generate

RUN yarn build

EXPOSE 3000

CMD yarn start

