FROM nginx:alpine
EXPOSE 80
COPY web-build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]