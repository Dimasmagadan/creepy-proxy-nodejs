server {
    server_name  mia-moda.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.mia-moda.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.mia-moda\.catalogi\.ru;
    listen 188.40.83.218;

    location ~* ^.+\.(css|jpe?g|gif|png|avi|swf|ico)$ {
        rewrite ^(.*)$ http://$subdomain.mia-moda.de$1 permanent;
    }

    location ~* ^.+\.(ttf|svg|css|js)$ {
        proxy_pass http://www.mia-moda.de:80;
        proxy_redirect http://www.mia-moda.de:80/ /;
        proxy_set_header Host www.mia-moda.de;
    }

    location ^~ /static/ {
        root /var/www/mia-moda;
    }

    location / {
        #if ($allowed_country = no) {
        #   rewrite ^/ http://www.mia-moda.de/ permanent;
        #}
        proxy_pass http://127.0.0.1:5052;
        proxy_redirect http://127.0.0.1:5052/ /;
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
