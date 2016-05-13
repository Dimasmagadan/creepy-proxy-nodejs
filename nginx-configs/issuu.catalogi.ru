# issuu domain config

server {
    listen 188.40.83.218:443;
    server_name issuu.catalogi.ru *.issuu.catalogi.ru;
    return 301 http://www.issuu.catalogi.ru;
}

server {
    server_name issuu.catalogi.ru;
    listen 188.40.83.218;
    rewrite ^(.*) http://www.issuu.catalogi.ru$1 permanent;
}

server {
    server_name ~^(?<subdomain>.*)\.issuu\.catalogi\.ru;
    listen 188.40.83.218;

    location ^~ /static/ {
        root /var/www/issuu;
    }

    location ~* ^.+\.(css|js|jpe?g|gif|png|avi|ico|swf)$ {
        rewrite ^(.*)$ http://$subdomain.issuu.com$1 permanent;
    }

    location / {
        proxy_pass http://127.0.0.1:6050;
        proxy_redirect http://127.0.0.1:6050/ /;
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
