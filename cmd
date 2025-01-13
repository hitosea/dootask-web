#!/bin/bash

#fonts color
Green="\033[32m"
Yellow="\033[33m"
Red="\033[31m"
GreenBG="\033[42;37m"
YellowBG="\033[43;37m"
RedBG="\033[41;37m"
Font="\033[0m"

#notification information
OK="${Green}[OK]${Font}"
Warn="${Yellow}[警告]${Font}"
Error="${Red}[错误]${Font}"

cur_path="$(pwd)"
cur_arg=$@
COMPOSE="docker-compose"

judge() {
    if [[ 0 -eq $? ]]; then
        success "$1 完成"
        sleep 1
    else
        error "$1 失败"
        exit 1
    fi
}

success() {
    echo -e "${OK} ${GreenBG}$1${Font}"
}

warning() {
    echo -e "${Warn} ${YellowBG}$1${Font}"
}

error() {
    echo -e "${Error} ${RedBG}$1${Font}"
}

info() {
    echo -e "$1"
}

check_docker() {
    docker --version &> /dev/null
    if [ $? -ne  0 ]; then
        error "未安装 Docker！"
        exit 1
    fi
    docker-compose version &> /dev/null
    if [ $? -ne  0 ]; then
        docker compose version &> /dev/null
        if [ $? -ne  0 ]; then
            error "未安装 Docker-compose！"
            exit 1
        fi
        COMPOSE="docker compose"
    fi
    if [[ -n `$COMPOSE version | grep -E "\sv1"` ]]; then
        $COMPOSE version
        error "Docker-compose 版本过低，请升级至v2+！"
        exit 1
    fi
}

check_node() {
    npm --version &> /dev/null
    if [ $? -ne  0 ]; then
        error "未安装 npm！"
        exit 1
    fi
    node --version &> /dev/null
    if [ $? -ne  0 ]; then
        error "未安装 Node.js！"
        exit 1
    fi
    if [[ -n `node --version | grep -E "v1"` ]]; then
        node --version
        error "Node.js 版本过低，请升级至v20+！"
        exit 1
    fi
}

run_compile() {
    local type=$1
    check_node
    if [ ! -d "./node_modules" ]; then
        npm install
    fi
    #
    if [ "$type" = "prod" ]; then
        rm -rf "./public/js/build"
        npx vite build -- fromcmd
    else
        npx vite -- fromcmd
    fi
}

run_electron() {
    local argv=$@
    check_node
    if [ ! -d "./node_modules" ]; then
        npm install
    fi
    if [ ! -d "./electron/node_modules" ]; then
        pushd electron
        npm install
        popd
    fi
    #
    if [ -d "./electron/dist" ]; then
        rm -rf "./electron/dist"
    fi
    if [ -d "./electron/public" ]; then
        rm -rf "./electron/public"
    fi
    #
    BUILD_FRONTEND="build"
    if [ "$argv" == "dev" ]; then
        switch_debug "$argv"
        BUILD_FRONTEND="dev"
    fi
    env BUILD_FRONTEND=$BUILD_FRONTEND node ./electron/build.js $argv
}

####################################################################################
####################################################################################
####################################################################################

if [ $# -gt 0 ]; then
    if [[ "$1" == "serve" ]] || [[ "$1" == "dev" ]] || [[ "$1" == "development" ]]; then
        shift 1
        run_compile dev
    elif [[ "$1" == "build" ]] || [[ "$1" == "prod" ]] || [[ "$1" == "production" ]]; then
        shift 1
        run_compile prod
    elif [[ "$1" == "appbuild" ]] || [[ "$1" == "buildapp" ]]; then
        shift 1
        run_electron app $@
    elif [[ "$1" == "electron" ]]; then
        shift 1
        run_electron $@
    elif [[ "$1" == "eeui" ]]; then
        shift 1
        check_docker
        cli="$@"
        por=""
        if [[ "$cli" == "build" ]]; then
            cli="build --simple"
        elif [[ "$cli" == "dev" ]]; then
            por="-p 8880:8880"
        fi
        docker run -it --rm -v ${cur_path}/resources/mobile:/work -w /work ${por} kuaifan/eeui-cli:0.0.1 eeui ${cli}
    else
        if [[ "$1" == "npm" ]]; then
            shift 1
            check_docker
            npm $@
            cd electron
            npm $@
            cd ..
            docker run --rm -it -v ${cur_path}/resources/mobile:/work -w /work --entrypoint=/bin/bash node:16 -c "npm $@"
        fi
        $COMPOSE "$@"
    fi
else
    $COMPOSE ps
fi
