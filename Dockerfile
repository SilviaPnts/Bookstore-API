FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run test:addBook

RUN npm run test:deleteBook

RUN npm run test:getAllBooks

RUN npm run test:getBookById

RUN npm run test:updateBook

CMD ["npm", "start"]