server {
    server_name ateliergs.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.ateliergs.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.ateliergs\.catalogi\.ru;
    listen 188.40.83.218;

    location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
        rewrite ^(.*)$ http://$subdomain.ateliergs.de$1 permanent;
    }

    location ~* ^.+\.(ttf|svg|css)$ {
        proxy_pass http://www.ateliergs.de:80;
        proxy_redirect http://www.ateliergs.de:80/ /;
        proxy_set_header Host www.ateliergs.de;
    }

    location ^~ /static/ {
        root /var/www/ateliergs;
    }

    location = /app.log {
        root /var/www/ateliergs/data/log;
        try_files $uri $uri/ /app.log;
    }

    location / {
        #if ($allowed_country = no) {
        #   rewrite ^/ http://www.ateliergs.de/ permanent;
        #}
        proxy_pass http://127.0.0.1:7051;
        proxy_redirect http://127.0.0.1:7051/ /;
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
