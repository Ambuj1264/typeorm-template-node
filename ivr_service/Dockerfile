FROM node:16-bullseye
WORKDIR /app/ivr_service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]