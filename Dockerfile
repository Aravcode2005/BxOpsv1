FROM node:26-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN chown node:node /app

USER node

RUN npm ci --omit=dev

COPY --chown=node:node . .

EXPOSE 9000

CMD ["node", "server.js"]
