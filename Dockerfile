FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=""

EXPOSE 3000

CMD ["npm", "run", "dev"]
