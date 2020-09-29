import { baseUrl } from '@/config/env'
import axios from './http'


/**
 * 房组管理模块
 */
const groupApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentGroup/getByExample`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentGroup/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/rentGroup/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/rentGroup/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/rentGroup/detail`, params)
  },
  
}


/**
 * 房屋管理模块
 */
const houseApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentHouse/getByExample`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentHouse/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/rentHouse/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/rentHouse/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/rentHouse/detail`, params)
  }
}
/**
 * 房客管理模块
 */
const personApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentPerson/getByExample`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentPerson/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/rentPerson/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/rentPerson/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/rentPerson/detail`, params)
  }
}

/**
 * 合同管理模块
 */
const contractApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentContract/getByExample`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentContract/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/rentContract/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/rentContract/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/rentContract/detail`, params)
  }
}

/**
 * 账单管理模块
 */
const billApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentBill/getByExample`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentBill/deleteByIds`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/rentBill/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/rentBill/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/rentBill/detail`, params)
  },
  // 根据组别选择
  getListByGroup (params) {
    return axios.post(`${baseUrl}/rentBill/getListByGroup`, params)
  },
  // 查询
  getByCondition (params) {
    return axios.post(`${baseUrl}/rentBill/getByCondition`, params)
  },
  // 保存或者更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/rentBill/saveOrUpdate`, params)
  },
}

export {
  groupApi,
  houseApi,
  personApi,
  contractApi,
  billApi
}
