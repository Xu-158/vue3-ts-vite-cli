/**
 * @Description: 权限
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RouteLocationNormalized, Router } from 'vue-router'
import { Keys } from './constant/key'
import storage, { StorageType } from './utils/storage'

export function permission(router: Router) {
  NProgress.configure({ showSpinner: false, minimum: 0.2 })
  const whiteList = ['/login']

  router.beforeEach(
    async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: any) => {
      NProgress.start()
      const hasToken = storage.getItem(StorageType.cookie, Keys.token)
      if (hasToken) {
        if (to.path === '/login') {
          next({ path: '/' })
        } else {
          next()
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) {
          next()
        } else {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  )

  router.afterEach((to: RouteLocationNormalized) => {
    NProgress.done()
  })
}
