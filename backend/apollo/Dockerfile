FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

# COPY ingress2.crt /etc/ssl/
# COPY ingress2.key /etc/ssl/

RUN npm install --only=production

# RUN npm ci --only=production

ENV WEBSITE_ADDRESS=https://auburnhacks.com/
ENV LOGIN_SECRET=login_secret
ENV EMAIL_SECRET=email_secret
ENV EMAIL_PASS=b680b119db3c19f4024512f9b7d80fa8-0a4b0c40-1a5fcac2
ENV NODE_ENV=production

# EXPOSE 8383

COPY . .

CMD ["npm", "start"]