FROM shepmaster/nginx-template-image
COPY dist /usr/share/nginx/html
ADD yt_nginx.conf.tmpl /etc/nginx/sites-templates/default.conf.tmpl

ENV LISTEN_PORT=80
ENV SERVER_NAME=localhost
ENV API_HOST=localhost
ENV API_PORT=5000
