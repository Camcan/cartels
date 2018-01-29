FROM mhart/alpine-node:8

RUN addgroup -S norights -g 1000 \
   && adduser -S -g underdog -u 1000 norights \
   && echo "builder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
USER underdog
WORKDIR /tmp
COPY package.json /tmp/

RUN npm install webpack -g
RUN npm config set registry http://registry.npmjs.org/ && npm install

RUN mkdir /webpacked
WORKDIR /webpacked
COPY . /webpacked
RUN cp -a /tmp/node_modules /webpacked
RUN npm run build-all
RUN npm install forever -g


ENV NODE_ENV=production
ENV PORT=4000
ENV BACKEND_URL="http://localhost:3001"

CMD ["forever", "./server.js"]

EXPOSE 4000
