import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * account的api
 */
const accountApi = {
  // 获取List
  list (params) {
    return axios.post(`${baseUrl}/accBook/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/accBook/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/accBook/add`, params)
  }, 
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/accBook/update`, params)
  },
  // 保存或更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/accBook/saveOrUpdate`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/accBook/detail`, params)
  },
  // 根据月份获取详细数据
  getListByTime (params) {
    return axios.post(`${baseUrl}/accBook/getListByTime`, params)
  },
  // 详情
  delete (params) {
    return axios.post(`${baseUrl}/accBook/delete`, params)
  },
  // 获取统计数据
  getAllSummary (params) {
    return axios.post(`${baseUrl}/accBook/getAllSummary`, params)
  }
}

export {
  accountApi
}
