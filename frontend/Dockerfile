FROM node:14 as build

WORKDIR /app

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm build

FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN yarn global add serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
