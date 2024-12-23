server {
    listen 80;
    server_name www.plancheto.com plancheto.com;

    location / {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_pass http://localhost:6767;
    }
}
