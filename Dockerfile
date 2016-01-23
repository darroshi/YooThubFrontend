FROM nginx
COPY dist /usr/share/nginx/html
COPY yt_nginx.conf /etc/nginx/conf.d/default.conf
