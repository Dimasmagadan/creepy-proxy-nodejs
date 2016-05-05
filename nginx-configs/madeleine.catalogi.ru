server {
	server_name  madeleine.catalogi.ru;
	listen 188.40.83.218;
	rewrite ^(.*) http://www.madeleine.catalogi.ru$1 permanent;
}

server {
	server_name ~^(?<subdomain>.*)\.madeleine\.catalogi\.ru;
	listen 188.40.83.218;

	location ~* ^.+\.(jpeg|gif|png|svg|js|css|mp3|ogg|mpe?g|avi|zip|gz|bz2?|rar|ico)$ {
		if ($subdomain = c) {
			rewrite ^(.*)$ http://madeleine.scoopcatalogue.de$1 permanent;
		}

		rewrite ^(.*)$ http://$subdomain.madeleine.de$1 permanent;
	}

	location ~* ^.+\.(jpg|swf)$ {
		if ($subdomain != c) {
			rewrite ^(.*)$ http://$subdomain.madeleine.de$1 permanent;
		}

		proxy_pass http://madeleine.scoopcatalogue.de:80;
		proxy_redirect http://madeleine.scoopcatalogue.de:80/ /;
		proxy_set_header Host madeleine.scoopcatalogue.de;
	}
	
	location = /google38e25bcd24c356de.html {
		root /var/www/madeleine/data/analytics;
		try_files $uri $uri/ /google38e25bcd24c356de.html;
	}
	
    location ^~ /static/ {
   	    root /var/www/madeleine;
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

		proxy_pass http://127.0.0.1:5055;
		proxy_redirect http://127.0.0.1:5055/ /;
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