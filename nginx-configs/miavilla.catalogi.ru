server {
        server_name  miavilla.catalogi.ru;
        listen 188.40.83.218;
        rewrite ^(.*) http://www.miavilla.catalogi.ru$1 permanent;
}

server {
        server_name ~^(?<subdomain>.*)\.miavilla\.catalogi\.ru;
        listen 188.40.83.218;

        location ~* ^.+\.(css|js|jpe?g|gif|png|avi|swf|ico)$ {
                rewrite ^(.*)$ http://$subdomain.miavilla.de$1 permanent;
        }

        location ~* ^.+\.(ttf|svg|css)$ {
                proxy_pass http://www.miavilla.de:80;
                proxy_redirect http://www.miavilla.de:80/ /;
                proxy_set_header Host www.miavilla.de;
        }

        location ^~ /static/ {
                root /var/www/miavilla;
        }

        location / {
                if ($allowed_country = no) {
                        rewrite ^/ http://www.miavilla.de/ permanent;
                }
                proxy_pass http://127.0.0.1:6055;
                proxy_redirect http://127.0.0.1:6055/ /;
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
}
