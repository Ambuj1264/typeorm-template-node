FROM node:16-bullseye
WORKDIR /app/fe_service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]