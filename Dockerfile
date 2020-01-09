FROM nginx:alpine
EXPOSE 80
EXPOSE 443
COPY nginx-default.conf /etc/nginx/conf.d/
COPY nginx.crt /etc/ssl/
COPY nginx.key /etc/ssl
COPY web-build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]