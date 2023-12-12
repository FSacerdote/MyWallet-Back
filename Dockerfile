FROM node:alpine

WORKDIR /usr/src

COPY . .

EXPOSE 5000

RUN npm install

CMD [ "npm", "start" ]