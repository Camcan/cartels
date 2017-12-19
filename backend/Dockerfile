FROM mhart/alpine-node:8

RUN apk update

WORKDIR /backend
COPY . .
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]


