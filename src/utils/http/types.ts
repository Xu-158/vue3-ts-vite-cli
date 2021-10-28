import { AxiosRequestConfig } from 'axios'

export interface MyAxiosReqConfig extends AxiosRequestConfig {
  // needRepeatCancel?: boolean //是否开启取消重复请求
  hideLoading?: boolean //是否开启loading层效果
  hideErrMessage?: boolean //是否开启接口错误信息展示
}

export interface IDataType<T = any> {
  success: boolean
  message: string
  result: T
}
