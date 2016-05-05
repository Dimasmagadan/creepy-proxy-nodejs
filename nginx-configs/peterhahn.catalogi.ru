server {
	server_name peterhahn.catalogi.ru;
	listen 188.40.83.218;
	rewrite ^(.*) http://www.peterhahn.catalogi.ru$1 permanent;
}
server {
	server_name ~^(?<subdomain>.*)\.peterhahn\.catalogi\.ru;
	listen 188.40.83.218;
	charset UTF-8;
	
	location ~* ^.+\.(jpg|jpeg|gif|png|svg|jsp|js|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|swf|ico)$ {
		rewrite ^(.*)$ http://$subdomain.peterhahn.de$1 permanent;
	}

	location ^~ /static/ {
		root /var/www/peterhahn;
	}
	
	location = /ajax/item/sizebox {
		proxy_pass http://www.peterhahn.de:80;
		proxy_redirect http://www.peterhahn.de:80/ /;
		proxy_set_header Host www.peterhahn.de;
	}

	location / {
        #set $allow "yes";
        #if ($allowed_country = no) {
        #    set $allow "no";
        #}
        #if ($remote_addr = 95.91.246.213) {
        #    set $allow "yes";
        #}
        #if ($allow != "yes") {
        #    rewrite ^/ http://www.madeleine.de/ permanent;
        #}
	
		if ($subdomain = media) {
			rewrite ^(.*)$ http://media.peterhahn.de$1 permanent;
		}
		if ($subdomain = cj) {
			return 404;
		}		
		
		proxy_pass http://188.40.83.218:6052;
		proxy_redirect http://188.40.83.218:6052/ /;
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