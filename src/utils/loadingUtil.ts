import { ElLoading } from 'element-plus'
import {
  ILoadingInstance,
  ILoadingOptions
} from 'element-plus/lib/components/loading/src/loading.type'
export class LoadingUtil {
  loadingCount = 0
  loadingInstance: ILoadingInstance | undefined

  text: string | undefined = ''
  target?: string | HTMLElement
  background: string | undefined = 'rgba(0,0,0,0.5)'
  lock?: boolean = true
  spinner?: boolean | string = 'el-icon-loading'

  constructor(options: ILoadingOptions) {
    this.text = options.text
    this.target = options.target
    if (options.background) this.background = options.background
    if (options.spinner) this.spinner = options.spinner
    if (options.lock) this.lock = options.lock
  }

  show() {
    if (this.loadingCount === 0) {
      this.loadingInstance = ElLoading.service({
        text: this.text,
        background: this.background,
        target: this.target,
        lock: this.lock,
        spinner: this.spinner
      })
    }
    this.loadingCount++
  }
  hidden() {
    if (this.loadingCount <= 0) return
    this.loadingCount--
    if (this.loadingCount === 0) {
      this.loadingInstance?.close()
    }
  }
}
