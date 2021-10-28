/**
 * @description 防抖函数
 */
export class Debounce {
  static use(fn: () => any, delay = 500, immediate = false) {
    let timer: NodeJS.Timeout
    return (...args: any) => {
      if (immediate) {
        fn.apply(this, args)
        immediate = false
        return
      }
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

/**
 * @description 深拷贝函数
 * @param {Object} obj
 * @param {WeakMap} hash 对象存在循环引用的情况
 */
export function deepClone(obj: any, hash = new WeakMap()) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  if (hash.get(obj)) return hash.get(obj)
  const cloneObj = new obj.constructor()
  hash.set(obj, cloneObj)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

/**
 * @description 下载文件
 * @param link 地址
 * @param name 文件名
 */
export function downloadExcel(link: string, name: string) {
  if (!name) {
    name = link.slice(link.lastIndexOf('/') + 1)
  }
  const elLink = document.createElement('a')
  elLink.download = name
  elLink.style.display = 'none'
  elLink.href = link
  document.body.appendChild(elLink)
  elLink.click()
  document.body.removeChild(elLink)
}

/**
 * 日期格式化函数
 * @param {Date|number} value 日期
 * @param {string} format 格式化规则
 * @return {string} 结果
 * @example
 * formatDate(1617244098351, "Y年M月D日") //2021年04月01日
 * formatDate(1617244098351, "Y年M月D日 h:m:s") //2021年04月01日 10:28:18
 * formatDate(1617244098351, 'Y-M-D h:m:s 星期d') //2021-06-03 09:57:08 星期四
 */
export function formatDate(value: number = Date.now(), format = 'Y-M-D h:m:s'): string {
  const formatNumber = (n: number) => `0${n}`.slice(-2) // 补0
  const date: Date = new Date(value)
  const formatList: string[] = ['Y', 'M', 'D', 'h', 'm', 's', 'd']
  const resultList: string[] = []
  resultList.push(date.getFullYear().toString())
  resultList.push(formatNumber(date.getMonth() + 1))
  resultList.push(formatNumber(date.getDate()))
  resultList.push(formatNumber(date.getHours()))
  resultList.push(formatNumber(date.getMinutes()))
  resultList.push(formatNumber(date.getSeconds()))
  resultList.push(['日', '一', '二', '三', '四', '五', '六'][date.getDay()])
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i])
  }
  return format
}

/**
 * 动画垂直滚动到页面指定位置
 * @param {HTMLElement} el 滚动的dom元素
 * @param { number } currentY 当前位置
 * @param { number } targetY 目标位置
 */
export function scrollAnimation(el: HTMLElement, currentY: number, targetY: number): void {
  const needScrollTop: number = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    el.scrollTo(_currentY, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(el, _currentY, targetY)
    } else {
      el.scrollTo(_currentY, targetY)
    }
  }, 20)
}

/**
 * 平滑滚动到页面顶部
 */
export const scrollToTop = (el?: HTMLElement): any => {
  let val = document.documentElement.scrollTop || document.body.scrollTop
  if (el) val = el.scrollTop
  if (val > 0) {
    window.requestAnimationFrame(scrollToTop(el))
    el ? el.scrollTo(0, val - val / 8) : window.scrollTo(0, val - val / 8)
  }
}

/**
 * 获取设备类型
 * @returns  'Mobile' | 'Desktop'
 */
export const getDeviceType = () => {
  const reg = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return reg.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
}
