FROM node:20.11.1


# package.json 및 package-lock.json 복사하여 종속성 설치
COPY . .


RUN npm install


# 포트 5000 오픈
EXPOSE 5000


RUN npx prisma generate

RUN node prisma/seed.js

# 서버 실행 명령어 설정
CMD ["npm", "run", "start"]
