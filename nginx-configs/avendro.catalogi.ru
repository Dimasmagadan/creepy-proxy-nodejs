server {
    server_name  avendro.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.avendro.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.avendro\.catalogi\.ru;
    listen 188.40.83.218;

    location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
        rewrite ^(.*)$ http://$subdomain.avendro.de$1 permanent;
    }

    location ~* ^.+\.(ttf|svg|css)$ {
        proxy_pass http://www.avendro.de:80;
        proxy_redirect http://www.avendro.de:80/ /;
        proxy_set_header Host www.avendro.de;
    }

    location / {
        root /var/www/otto/data/www/avendro.catalogi.ru;
        index index.php;

        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_pass unix:/var/run/php5-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
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