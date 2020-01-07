FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]