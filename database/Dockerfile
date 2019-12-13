FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# RUN npm ci --only=production

COPY . .

EXPOSE 8383

CMD ["npm", "start"]