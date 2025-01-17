# Install

**[English](./README.md)** | 中文文档

- [截图预览](./README_PREVIEW.md)
- [演示站点](http://www.dootask.com/)

**QQ交流群**

- QQ群号: `546574618`

## 安装程序

- 支持环境：`Centos/Debian/Ubuntu/macOS/Windows`
- 硬件建议：2核4G以上
- 特别说明：Windows 用户请使用 `git bash` 或者 `cmder` 运行命令

### 部署项目

```bash
# 1、克隆项目到您的本地或服务器

# 通过github克隆项目
git clone --depth=1 git@github.com:hitosea/dootask-web.git

# 2、进入目录
cd dootask-web

# 3、复制环境变量文件
cp .env.example .env

# 4、安装依赖
npm install

# 5、配置环境变量
VITE_APP_DEBUG=false # 关闭调试
VITE_APP_BASE_PATH="" # 基础路径，如果没有基础路径，请设置为空，例如：/public
VITE_APP_URL="" # 接口地址

# 6、编译项目（这是网页端的，App/Pc/Mac客户端请查看 README_PUBLISH.md）
./cmd prod # 或 npm run build
```

### 服务器部署

- 复制public目录中的文件到服务器web目录

```bash
# 配置nginx示例
server {
    listen       80;
    server_name  your_domain;

    # gzip配置
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    # Vue项目的根目录
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        # 解决Vue路由history模式刷新404问题
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存配置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        root   /usr/share/nginx/html;
        expires 7d;
        access_log off;
    }

    # 错误页面配置
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### 开发编译

- 请确保你已经安装了 `NodeJs 20+`

```bash
# 1、配置环境变量
VITE_APP_DEBUG=true # 开启调试
VITE_APP_URL="" # 接口地址

# 2、编译项目
./cmd dev # 或 npm run start
```