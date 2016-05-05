server {
    server_name  heine.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.heine.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.heine\.catalogi\.ru;
    listen 188.40.83.218;

    location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
        rewrite ^(.*)$ http://$subdomain.heine.de$1 permanent;
    }

    location ~* ^.+\.(ttf|svg|css)$ {
        proxy_pass http://www.heine.de:80;
        proxy_redirect http://www.heine.de:80/ /;
        proxy_set_header Host www.heine.de;
    }

    location ^~ /static/ {
        root /var/www/heine;
    }

    location / {
        #if ($allowed_country = no) {
        #   rewrite ^/ http://www.heine.de/ permanent;
        #}
        proxy_pass http://127.0.0.1:6051;
        proxy_redirect http://127.0.0.1:6051/ /;
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
