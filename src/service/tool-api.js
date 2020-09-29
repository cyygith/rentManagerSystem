import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * catalog的api
 */
const genApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/toolGenCode/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/toolGenCode/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/toolGenCode/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/toolGenCode/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/toolGenCode/detail`, params)
  },
  // 生成
  generator (params) {
    return axios.post(`${baseUrl}/toolGenCode/runTool`, params)
  }
}

export {
  genApi
}
