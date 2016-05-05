server {
    server_name  schneider.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.schneider.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.schneider\.catalogi\.ru;
    listen 188.40.83.218;

    location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
        rewrite ^(.*)$ http://$subdomain.schneider.de$1 permanent;
    }

    location ~* ^.+\.(ttf|svg|css)$ {
        proxy_pass http://www.schneider.de:80;
        proxy_redirect http://www.schneider.de:80/ /;
        proxy_set_header Host www.schneider.de;
    }

    location ^~ /static/ {
        root /var/www/schneider;
    }

    location / {
        #if ($allowed_country = no) {
        #   rewrite ^/ http://www.schneider.de/ permanent;
        #}
        proxy_pass http://127.0.0.1:6056;
        proxy_redirect http://127.0.0.1:6056/ /;
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
