FROM smauec/node:0.0.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8083
CMD ["node", "server.js"]
