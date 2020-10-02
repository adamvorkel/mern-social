FROM node:12

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 5000

CMD [ "npm", "run", "dev" ]