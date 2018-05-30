FROM mhart/alpine-node:8

RUN apk update
RUN apk add --no-cache bash

WORKDIR /backend
COPY . .
RUN npm install

EXPOSE 3000

CMD ["./wait-for-it.sh", "localhost:27017", "--", "npm", "start"]


