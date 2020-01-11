FROM nginx:alpine
EXPOSE 80
# EXPOSE 443
COPY nginx.conf /etc/nginx/nginx.conf
# COPY ingress.crt /etc/ssl/
# COPY ingress.key /etc/ssl/
COPY web-build/ /var/www
CMD ["nginx", "-g", "daemon off;"]