FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN chmod +x docker-start.sh

EXPOSE 3000

CMD ["/bin/sh", "docker-start.sh"]
