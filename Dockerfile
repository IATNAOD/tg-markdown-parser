FROM node:22

WORKDIR /usr/bot

COPY . .

RUN yarn install

CMD [ "node", "index.js" ]