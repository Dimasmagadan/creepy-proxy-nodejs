server {
    server_name cdn.catalogi.ru;
    listen 188.40.83.218;
    charset UTF-8;

    location / {
        #add_header 'Access-Control-Allow-Origin' '*';
        root /var/www/cdn/data;
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