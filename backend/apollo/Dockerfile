FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

# COPY ingress2.crt /etc/ssl/
# COPY ingress2.key /etc/ssl/

RUN npm install --only=production

# RUN npm ci --only=production

ENV LOGIN_SECRET=login-secret
ENV EMAIL_SECRET=email-secret

# EXPOSE 8383

COPY . .

CMD ["npm", "start"]