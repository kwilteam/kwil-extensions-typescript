FROM node:14

WORKDIR /test

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 50051
CMD ["node", "test.js"]
