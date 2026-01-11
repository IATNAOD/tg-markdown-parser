FROM node:20

WORKDIR /usr/backend

COPY . .

RUN chown -R node:node /usr/backend

USER node

CMD [ "node", "index.js" ]