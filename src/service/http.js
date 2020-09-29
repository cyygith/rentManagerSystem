/**
 * axios 封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import router from '../router'

/**
 * 提示函数
 * 禁止点击蒙版、显示一秒后关闭
 */
const tip = msg => {
  alert(msg, '提示信息')
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} code  请求失败的状态码
 */
const errorHandle = (code, other) => {
  switch (code) {
    // 401 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      sessionStorage.removeItem('access-token')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404 请求的资源不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      tip('系统问题' + other)
  }
}

/**
 * 创建axios实例
 */
var instance = axios.create({timeout: 1000 * 25})
instance.defaults.withCredentials = true // 允许跨域
/**
 * 设置请求头,这个看情况，可设置可不设置，使用默认的也可以
 * instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 */
instance.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * 请求拦截器
 * 每次请求前，如果存在token，则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access-token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.error(error)
)
/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  res => {
    // console.dir(res);
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  // 请求失败
  error => {
    const {response} = error
    if (response) {
      // 请求已发出，但不在2xxd fanwei
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 断网处理
      tip('请求发送失败，请检查网络是否连接');
    }
  }
)
export default instance
