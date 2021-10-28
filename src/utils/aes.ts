/*
 * @Description:AES加密
 */
import { Keys } from '@/constant/key'
import { AES, mode, pad, enc } from 'crypto-ts'

export default class VAES {
  static encrypt(text: string | null): string | null {
    return AES.encrypt(text ?? '', Keys.aes, {
      mode: mode.ECB,
      padding: pad.PKCS7
    }).toString()
  }

  static decrypt(text: string | null): string | null {
    return AES.decrypt(text ?? '', Keys.aes, {
      mode: mode.ECB,
      padding: pad.PKCS7
    }).toString(enc.Utf8)
  }
}
