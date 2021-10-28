import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import interceptor from './interceptor'
import { MyAxiosReqConfig } from './types'
const isDEV = process.env.NODE_ENV === 'development'
const { URL_DEV_API, URL_PROD_API } = window?.global as any
const baseUrl = isDEV ? URL_DEV_API : URL_PROD_API

function myAxios<T = any>(axiosConfig: MyAxiosReqConfig): Promise<T> {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 30 * 1000,
    withCredentials: true //当前请求为跨域类型时是否在请求中协带cookie。
  })
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => interceptor.requestInterceptor(axiosConfig, config),
    (err) => Promise.reject(err)
  )
  instance.interceptors.response.use(
    (response: AxiosResponse) => interceptor.responseInterceptor(axiosConfig, response),
    (err) => interceptor.responseHttpError(axiosConfig, err)
  )
  return instance.request<any, T>(axiosConfig)
}

export default myAxios
