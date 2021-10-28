import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { MyAxiosReqConfig } from './types'

export const handleHttpError = function (axiosConfig: MyAxiosReqConfig, error: any): any {
  const errMsg = String(error.message).toLowerCase()
  let msg = ''
  const msgMap: Record<number, string> = {
    302: '接口重定向了!',
    400: '请求参数不正确!',
    401: '未授权，或登录已超时，请重新登录!',
    403: '您没有权限操作!',
    404: `请求地址出错：${error.config.url}`,
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
  }
  // 处理被取消的请求
  if (axios.isCancel(error)) return console.error('请求的重复请求：' + error.data)
  if (errMsg.includes('timeout')) msg = '网络请求超时！'
  if (errMsg.includes('network')) {
    msg = window.navigator.onLine ? '服务端异常！' : '您断网了！'
  }
  if (msgMap[error.status]) msg = msgMap[error.status] || '未知错误'
  if (!axiosConfig.hideErrMessage) {
    ElMessage({
      message: msg,
      type: 'error'
    })
  }
  switch (error.status) {
    case 401:
      router.replace({
        path: '/login',
        query: {
          // redirect: router.currentRoute.fullPath,
        }
      })
      break
  }
}
