# apart-fashion domain config

server {
    server_name apart-fashion.catalogi.ru;
    listen 188.40.83.218:443;
    ssl on;
    ssl_certificate      /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key  /etc/nginx/ssl/nginx.key;
    rewrite ^(.*) http://www.apart-fashion.catalogi.ru$1 permanent;
}

server {
    server_name apart-fashion.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.apart-fashion.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.apart-fashion\.catalogi\.ru;
    listen 188.40.83.218;

    location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
        rewrite ^(.*)$ http://$subdomain.apart-fashion.de$1 permanent;
    }

    location ~* ^.+\.(ttf|svg|css)$ {
        proxy_pass http://www.apart-fashion.de:80;
        proxy_redirect http://www.apart-fashion.de:80/ /;
        proxy_set_header Host www.apart-fashion.de;
    }

    location ^~ /static/ {
        root /var/www/apart-fashion;
    }

    location = /app.log {
        auth_basic "Restricted Content";
        auth_basic_user_file /var/www/.htpasswd;
        root /var/www/apart-fashion/data/log;
        try_files $uri $uri/ /app.log;
    }

    location / {
        #if ($allowed_country = no) {
        #   rewrite ^/ http://www.apart-fashion.de/ permanent;
        #}
        proxy_pass http://127.0.0.1:5051;
        proxy_redirect http://127.0.0.1:5051/ /;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }

	error_page 500 502 503 504 /50x.html;
	location = /50x.html {
    	root /var/www;
    	internal;
	}
    error_page 404 /404.html;
    location = /404.html {
        root /var/www;
        internal;
    }
}
