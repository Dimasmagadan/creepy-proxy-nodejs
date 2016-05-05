server {
	server_name  klingel.catalogi.ru;
	listen 188.40.83.218;
	rewrite ^(.*) http://www.klingel.catalogi.ru$1 permanent;
}

server {
	server_name ~^(?<subdomain>.*)\.klingel\.catalogi\.ru;
	listen 188.40.83.218;

	location ~* ^.+\.(jpg|jpeg|gif|png|svg|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|swf|ico)$ {
		rewrite ^(.*)$ http://$subdomain.klingel.de$1 permanent;
	}

	location ~* ^.+\.(woff|ttf|svg|js)$ {
		proxy_pass http://www.klingel.de:80;
		proxy_redirect http://www.klingel.de:80/ /;
		proxy_set_header Host www.klingel.de;
	}

    location ^~ /static/ {
		root /var/www/klingel;
    }

	location / {
		#if ($allowed_country = no) {
		#	rewrite ^/ http://www.klingel.de/ permanent;
		#}
		proxy_pass http://127.0.0.1:5058;
		proxy_redirect http://127.0.0.1:5058/ /;
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