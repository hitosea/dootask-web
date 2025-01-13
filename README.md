# Install

English | **[中文文档](./README_CN.md)**

- [Screenshot preview](./README_PREVIEW.md)
- [Demo site](http://www.dootask.com/)

**QQ Group**

Group No.: `546574618`

## Setup

- System: `Centos/Debian/Ubuntu/macOS/Windows`
- Hardware suggestion: 2 cores and above 4G memory
- Special note: Windows users please use `git bash` or `cmder` to run the command

### Deployment

```bash
# 1、Clone the repository

# Clone projects on github
git clone --depth=1 git@github.com:hitosea/dootask-web.git

# 2、Enter directory
cd dootask-web

# 3、Copy environment variable file
cp .env.example .env

# 4、Install dependencies
npm install

# 5、Production compilation
./cmd prod # or npm run build
```

### Server deployment

- Copy the files in the public directory to the server web directory

```bash
# nginx configuration example
server {
    listen       80;
    server_name  your_domain;

    # gzip configuration
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    # Vue project root directory
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        # Solve the problem of 404 when refreshing the Vue routing history mode
        try_files $uri $uri/ /index.html;
    }

    # Static resource cache configuration
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root   /usr/share/nginx/html;
        expires 7d;
        access_log off;
    }

    # Error page configuration
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### Development compilation

- `NodeJs 20+` must be installed

```bash
# Development
./cmd dev # or npm run start
```
