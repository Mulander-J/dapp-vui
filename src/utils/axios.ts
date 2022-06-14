import Axios from 'axios'
import { deepClone } from '@/utils'
import notice from '../plugins/eleNotify'

Axios.defaults.timeout = 10000
Axios.defaults.withCredentials = true
Axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

console.log('[ VITE_API_BASE_URL ]', import.meta.env.VITE_API_BASE_URL)

Axios.interceptors.request.use(
  (config) => {
    if (config.headers != undefined) {
      // config.headers['Accept-Language'] = window.gConfig.locale
      config.headers['Accept-Language'] = 'en'
    }
    return config
  },
  (error) => Promise.reject(error),
)

Axios.interceptors.response.use(
  (res) => {
    const { data } = res
    if (data instanceof Blob) {
      return data
    }
    if (data.error_code) {
      // dealError(data.error_code)
      return Promise.reject(data.error_code)
    }
    if (data.code === 200) {
      return data
    }
    // 处理接口抛错
    return Promise.reject(data.code)
  },
  (error) => {
    console.log(error)
    notice.error('Network Error')
    return Promise.reject(error)
  },
)
export function formatAttribute(obj: Record<string, any>): Record<string, any> {
  const res = deepClone(obj)
  Object.entries(res).forEach(([k, v]) => {
    if (v === '' || v === null || v === undefined) {
      delete res[k]
    } else if (typeof v === 'string') {
      res[k] = v.trim()
    }
  })
  return res
}

export default Axios
