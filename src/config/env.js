/**
 * 配置编译环境和线上环境的，在这里修改
 * 
 * baseUrl：服务器地址
 * routerMode：路由模式
 * imgBaseUrl:图片地址
 */
let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';

if(process.env.NODE_ENV == 'development'){
    baseUrl = 'http://127.0.0.1:8080/ellingmaster';
    imgBaseUrl = 'http://127.0.0.1:8080/demo/image';
}else if(process.env.NODE_ENV == 'production'){
    baseUrl = 'http://www.xiwaiwai.top/ellingmaster';
    imgBaseUrl = 'http://www.xiwaiwai.top/upload';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
}