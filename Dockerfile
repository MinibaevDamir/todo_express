FROM node:14

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

#COPY ./docker-entrypoint.sh /docker-entrypoint.sh
#
#
#RUN chmod +x /docker-entrypoint.sh
#
#ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 3000

CMD ["npm", "start", "server"]