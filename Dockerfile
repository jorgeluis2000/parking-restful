FROM node:16.13

LABEL com.jorgeguizagranobles.author="jorgeluis.gg.2000@gmail.com;"

COPY "package.json" "/backend/"

COPY "package-lock.json" "/backend/"

WORKDIR /backend/

RUN npm ci

COPY . .

EXPOSE 4600/tcp

CMD [ "npm", "start" ]