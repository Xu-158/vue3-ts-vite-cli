/**
 * @description: 全局存储类(AES加密)
 */
import VAES from './aes'
import Cookies from 'js-cookie'

export enum StorageType {
  local,
  session,
  cookie
}

interface IStorage {
  setItem<T>(type: StorageType, key: string, value: T, cookieOption?: Record<string, unknown>): void
  getItem(type: StorageType, key: string): string | null
  removeItem(type: StorageType, key: string): void
}

class VStorage implements IStorage {
  private static instance: VStorage
  static _() {
    if (!this.instance) {
      this.instance = new VStorage()
    }
    return this.instance
  }
  setItem<T>(
    type: StorageType,
    key: string,
    value: T,
    cookieOption?: Record<string, unknown>
  ): void {
    const valueJson = JSON.stringify(value)
    const valueAes = VAES.encrypt(valueJson) as string
    if (type === StorageType.local) {
      localStorage.setItem(key, valueAes)
    } else if (type === StorageType.session) {
      sessionStorage.setItem(key, valueAes)
    } else {
      Cookies.set(key, valueAes, cookieOption)
    }
  }
  getItem(type: StorageType, key: string): string | null {
    let res: any
    if (type === StorageType.local) {
      res = localStorage.getItem(key)
    } else if (type === StorageType.session) {
      res = sessionStorage.getItem(key)
    } else {
      res = Cookies.get(key)
    }
    return JSON.parse((VAES.decrypt(res) as string) || '""')
  }
  removeItem(type: StorageType, key: string): void {
    if (type === StorageType.local) {
      localStorage.removeItem(key)
    } else if (type === StorageType.session) {
      sessionStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  }
}

export default VStorage._()
