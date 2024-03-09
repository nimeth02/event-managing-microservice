FROM node

WORKDIR /app/payment

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]