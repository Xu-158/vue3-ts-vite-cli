// 消息提示框、消息确认框、提交内容框
import { ElMessage as $message, ElMessageBox as $messageBox } from 'element-plus'
const useMessage = () => {
  // import { getCurrentInstance } from 'vue'
  // const instance = getCurrentInstance()
  // const { $message, $messageBox }: any = instance?.appContext.config.globalProperties

  // 消息弹框
  type MessageType = {
    tips: string
    type?: 'success' | 'warning' | 'info' | 'error'
    showClose?: boolean
    center?: boolean
  }
  const showMessage = ({
    tips,
    type: type = 'success',
    showClose = true,
    center = false
  }: MessageType) => {
    $message({
      message: tips,
      type,
      showClose,
      center
    })
  }

  // 确认消息弹框
  type MessageBoxType = {
    title?: string
    tips?: string
    type?: 'success' | 'warning' | 'info' | 'error'
    okCallback?: () => void
    cancelCallback?: () => void
    okBtnText?: string
    cancelBtnText?: string
    iconClass?: string | undefined
  }
  const showMessageBox = ({
    title = '提示',
    tips,
    type = 'warning',
    okCallback = () => {},
    cancelCallback = () => {},
    okBtnText = '确定',
    cancelBtnText = '取消',
    iconClass
  }: MessageBoxType) => {
    $messageBox
      .confirm(tips, title, {
        confirmButtonText: okBtnText,
        cancelButtonText: cancelBtnText,
        type,
        iconClass
      })
      .then(() => {
        okCallback()
      })
      .catch(() => {
        cancelCallback()
        showMessage({ tips: '取消', type: 'info' })
      })
  }

  // 提交内容 带输入框
  type MessagePromptType = {
    tips?: string
    title?: string
    initValue?: string
    okBtnText?: string
    cancelBtnText?: string
    inputReg?: RegExp
    errMsg?: string
    inputType?: string
    okCallback?: (res: string) => void
    cancelCallback?: (err: any) => void
  }
  const showPrompt = ({
    tips,
    title = '标题',
    initValue,
    okBtnText = '确定',
    cancelBtnText = '取消',
    inputReg = new RegExp(''),
    errMsg,
    inputType = 'textarea',
    okCallback = (res) => {},
    cancelCallback = (err) => {}
  }: MessagePromptType) => {
    $messageBox
      .prompt(tips, title, {
        confirmButtonText: okBtnText,
        cancelButtonText: cancelBtnText,
        inputPattern: inputReg,
        inputValue: initValue,
        inputType,
        inputErrorMessage: errMsg
      })
      .then((res: any) => {
        okCallback(res.value)
      })
      .catch((err: any) => {
        cancelCallback(err)
        showMessage({ tips: '取消', type: 'info' })
      })
  }

  return { showMessageBox, showMessage, showPrompt }
}

export default useMessage
