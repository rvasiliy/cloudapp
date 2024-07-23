FROM node:18

WORKDIR /app

COPY . /app
RUN npm ci

EXPOSE 8080
VOLUME /app

CMD ["npm", "run", "start"]
