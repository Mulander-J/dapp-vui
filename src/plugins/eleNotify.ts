import { ElNotification } from 'element-plus'

import IconError from '../components/logos/notice/NoticeError.vue'
import IconInfo from '../components/logos/notice/NoticeInfo.vue'
import IconSuccess from '../components/logos/notice/NoticeSuccess.vue'
import IconMetamask from '../components/logos/MetaMask.vue'

import { getOutLink } from '@/utils/chainFormat'

const CUSTOM_CLASS = 'metal-notify'

interface NotifyPayload {
  title: string
  message: string
  icon?: any
  customClass?: string
  duration?: number
}

const config = {
  duration: 3000,
  position: 'bottom-right',
}

const notify = (args: NotifyPayload) => {
  return ElNotification({
    ...config,
    ...argGetter(args),
  })
}

notify.info = (args: NotifyPayload) => {
  return ElNotification({
    ...config,
    customClass: CUSTOM_CLASS + ' info',
    title: 'Tips',
    icon: IconInfo,
    ...argGetter(args),
  })
}

notify.waitTx = (args: NotifyPayload, payload: any) => {
  return ElNotification({
    ...config,
    customClass: CUSTOM_CLASS + ` ${payload.status || 'info'} withTxhash`,
    title: 'Tips',
    icon: payload.status === 'success' ? IconSuccess : IconInfo,
    message: [
      `<label>Deposit</label><span>${payload.deposite}</span>`,
      `<label>Recevied</label><span>${payload.recevied}</span>`,
      `<a target="_blank" rel="nofollow" href="${getOutLink(
        'tx',
        payload.txHash,
      )}">View on Ethersacn</a>`,
    ]
      .map((s) => `<p>${s}</p>`)
      .join(''),
    dangerouslyUseHTMLString: true,
    duration: 3000,
    ...argGetter(args),
  })
}

notify.success = (args: NotifyPayload) => {
  return ElNotification({
    ...config,
    customClass: CUSTOM_CLASS + ' success',
    title: 'Success',
    icon: IconSuccess,
    ...argGetter(args),
  })
}

notify.error = (args: NotifyPayload) => {
  return ElNotification({
    ...config,
    customClass: CUSTOM_CLASS + ' error',
    title: 'Oops!',
    icon: IconError,
    ...argGetter(args),
  })
}

notify.warning = (args: NotifyPayload) => {
  return ElNotification({
    ...config,
    customClass: CUSTOM_CLASS + ' warning',
    title: 'Warn!',
    icon: IconInfo,
    ...argGetter(args),
  })
}

notify.noWallet = (args: NotifyPayload) => {
  return ElNotification({
    ...config,
    customClass: CUSTOM_CLASS + ' error',
    icon: IconMetamask,
    title: 'Wallet Uninstalled',
    message: `Go Get <a class="go-link" target="_blank" rel="nofollow" href="https://metamask.io/download/">Metamask</a>`,
    dangerouslyUseHTMLString: true,
    duration: 5000,
    ...argGetter(args),
  })
}

export default notify

const argGetter = (args: string | any) => {
  if (typeof args === 'string') {
    return { message: args }
  }
  return args
}
