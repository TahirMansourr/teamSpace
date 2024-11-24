FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"

EXPOSE 3000

CMD ["npm", "run", "dev"]
