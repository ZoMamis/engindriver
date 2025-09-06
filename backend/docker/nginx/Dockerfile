# docker/nginx/Dockerfile
FROM nginx:alpine

# Copie de la configuration Nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Création du répertoire de travail
WORKDIR /var/www/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]