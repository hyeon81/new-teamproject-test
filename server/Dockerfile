FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npx prisma generate

EXPOSE 4000

# 앱을 실행합니다.
CMD [ "npm", "start" ]
