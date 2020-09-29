import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * catalog的api
 */
const catalogApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/gCatalog/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/gCatalog/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/gCatalog/add`, params)
  },
  // 详情
  update (params) {
    return axios.post(`${baseUrl}/gCatalog/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/gCatalog/detail`, params)
  }
}

/**
 * goods的api
 */
const goodsApi = {
  // 获取roleList
  list (params) {
    return axios.post(`${baseUrl}/gGoods/getByExample`, params)
  },
  // 删除roleList
  deleteByIds (params) {
    return axios.post(`${baseUrl}/gGoods/deleteByIds`, params)
  },
  // 详情
  save (params) {
    return axios.post(`${baseUrl}/gGoods/add`, params)
  },
  // 提交
  submit (params) {
    return axios.post(`${baseUrl}/gGoods/saveIncludeImage`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/gGoods/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/gGoods/getGoodsById`, params)
  },
  // 获取上级目录树g_catalog
  getCatalogTree (params) {
    return axios.post(`${baseUrl}/gCatalog/getCatalogTree`, params)
  },
}

export {
  catalogApi,
  goodsApi
}
