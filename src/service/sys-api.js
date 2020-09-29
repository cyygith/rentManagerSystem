import { baseUrl } from '@/config/env'
import axios from './http'
/**
 * 系统管理模块
 */
const commonApi = {
  // 登录页面
  login (param) {
    return axios.post(`${baseUrl}/syslogin/login`, param)
  },
  // 注册页面
  register (param) {
    return axios.post(`${baseUrl}/sysNoAuth/registerUser`, param)
  },
}

export {
  commonApi
}
