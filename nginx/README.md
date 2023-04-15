__nginx__
```bash
http {
    server {
        listen       80;
        server_name  example.com;

        # Serve static content directly from NGINX
        location /static/ {
            root /var/www/example.com;
        }

        # Proxy all other requests to the web server
        location / {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```
_fredrik (at) conva se_
