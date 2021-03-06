import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * 报表模块
 */
const chartApi = {
  // 根据房间号统计所收租金总数
  getRentSummaryGroup (params) {
    return axios.post(`${baseUrl}/rentBill/getRentSummaryGroup`, params)
  },
  // 根据具体房间号，统计所收详细租金情况 
  getRentSummaryByMonth (params) {
    return axios.post(`${baseUrl}/rentBill/getRentSummaryByMonth`, params)
  },
}


/**
 * group管理模块
 */
const groupApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentGroup/list`, params)
  },
  // 删除(多条)
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentGroup/deleteByIds`, params)
  },
  // 删除
  delete (params) {
    return axios.post(`${baseUrl}/rentGroup/delete`, params)
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
  // 查询
  getByCondition (params) {
    return axios.post(`${baseUrl}/rentGroup/getByCondition`, params)
  },
  // 保存或者更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/rentGroup/saveOrUpdate`, params)
  },
  // 根据组别选择
  getListByGroup (params) {
    return axios.post(`${baseUrl}/rentGroup/getListByGroup`, params)
  },
}


/**
 * house管理模块
 */
const houseApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentHouse/list`, params)
  },
  // 删除
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentHouse/deleteByIds`, params)
  },
  // 删除
  delete (params) {
    return axios.post(`${baseUrl}/rentHouse/delete`, params)
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
  },
  // 查询
  getByCondition (params) {
    return axios.post(`${baseUrl}/rentHouse/getByCondition`, params)
  },
  // 保存或者更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/rentHouse/saveOrUpdate`, params)
  },
}
/**
 * person管理模块
 */
const personApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentPerson/list`, params)
  },
  // 删除(多条)
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentPerson/deleteByIds`, params)
  },
  // 删除
  delete (params) {
    return axios.post(`${baseUrl}/rentPerson/delete`, params)
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
  },
  // 查询
  getByCondition (params) {
    return axios.post(`${baseUrl}/rentPerson/getByCondition`, params)
  },
  // 保存或者更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/rentPerson/saveOrUpdate`, params)
  },
}

/**
 * contract管理模块
 */
const contractApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentContract/list`, params)
  },
  // 删除(多条)
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentContract/deleteByIds`, params)
  },
  // 删除
  delete (params) {
    return axios.post(`${baseUrl}/rentContract/delete`, params)
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
  },
  // 查询
  getByCondition (params) {
    return axios.post(`${baseUrl}/rentContract/getByCondition`, params)
  },
  // 保存或者更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/rentContract/saveOrUpdate`, params)
  },
  //生成收据  return axios.post(`${baseUrl}/rentBill/getPdf`, params)
  getPdf (params) {
    return  axios({
      url: `${baseUrl}/rentContract/getDepositPdf`,
      timeout: 30000, // 请求超时时间10s
      headers: {
      //'Content-Type': 'application/x-zip-compressed',
        'Authorization': '',//token orgin vaue  [token]
      },
      xhrFields: {
        withCredentials: true
      },
      method:'post',
      data:params,
      responseType: 'blob',
    });
  },
}

/**
 * 账单管理模块
 */
const billApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentBill/list`, params)
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
  // 保存或者更新
  saveOrUpdateBillAndPerson (params) {
    return axios.post(`${baseUrl}/rentBill/saveOrUpdateBillAndPerson`, params)
  },
  // 保存或者更新
  updateBillAndSetRenting (params) {
    return axios.post(`${baseUrl}/rentBill/updateBillAndSetRenting`, params)
  },
  // 收租 doRent
  doRent (params) {
    return axios.post(`${baseUrl}/rentBill/doRent`, params)
  },
  //监控收租情况
  monitorRentEndTime (params) {
    return axios.post(`${baseUrl}/rentBill/monitorRentEndTime`, params)
  },
  //生成收据  return axios.post(`${baseUrl}/rentBill/getPdf`, params)
  getPdf (params) {
    // return axios.post(`${baseUrl}/rentBill/getPdf`, params)
    return  axios({
	      url: `${baseUrl}/rentBill/getPdf`,
	      timeout: 30000, // 请求超时时间10s
	      headers: {
	      //'Content-Type': 'application/x-zip-compressed',
	        'Authorization': '',//token orgin vaue  [token]
	      },
	      xhrFields: {
	        withCredentials: true
	      },
	      method:'post',
	      data:params,
	      responseType: 'blob',
	  });
  },
}

/**
 * config管理模块
 */
const configApi = {
  // list
  list (params) {
    return axios.post(`${baseUrl}/rentConfig/list`, params)
  },
  // 删除(多条)
  deleteByIds (params) {
    return axios.post(`${baseUrl}/rentConfig/deleteByIds`, params)
  },
  // 删除
  delete (params) {
    return axios.post(`${baseUrl}/rentConfig/delete`, params)
  },
  // 保存
  save (params) {
    return axios.post(`${baseUrl}/rentConfig/add`, params)
  },
  // 更新
  update (params) {
    return axios.post(`${baseUrl}/rentConfig/update`, params)
  },
  // 详情
  detail (params) {
    return axios.post(`${baseUrl}/rentConfig/detail`, params)
  },
  // 查询
  getByCondition (params) {
    return axios.post(`${baseUrl}/rentConfig/getByCondition`, params)
  },
  // 保存或者更新
  saveOrUpdate (params) {
    return axios.post(`${baseUrl}/rentConfig/saveOrUpdate`, params)
  },
}

export {
  groupApi,
  houseApi,
  personApi,
  contractApi,
  billApi,
  configApi,
  chartApi
}
