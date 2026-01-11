FROM node:20

WORKDIR /usr/bot

COPY . .

RUN chown -R node:node /usr/bot

USER node

CMD [ "node", "index.js" ]