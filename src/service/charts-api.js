import { baseUrl } from '@/config/env'
import axios from './http'

/**
 * article的api
 */
const chartsApi = {
  // 获取折线图表
  getCLineCharts (params) {
    return axios.post(`${baseUrl}/cCharts/getCLineCharts`, params)
  },
  
}

export {
  chartsApi
}
