FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["ts-node", "./src/server.ts"]