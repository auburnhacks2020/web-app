FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --only=production

ENV WEBSITE_ADDRESS=https://auburnhacks.com/
ENV LOGIN_SECRET=login_secret
ENV EMAIL_SECRET=email_secret
ENV NODE_ENV=production

# EXPOSE 8383

COPY . .

CMD ["npm", "start"]