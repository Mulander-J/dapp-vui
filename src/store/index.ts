import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { deepClone } from '@/utils'
import { WalletName } from '@/hooks'

interface TopState {
  isMobile: boolean
  isLegalRegion: boolean | null
  selectWalletDialog: boolean
  showBalance: boolean
  lastWallet: WalletName
}

const defaultState: TopState = {
  isMobile: window.innerWidth <= 750,
  isLegalRegion: null,
  selectWalletDialog: false,
  showBalance: false,
  lastWallet: 'metamask',
}
type State = typeof defaultState
export const key: InjectionKey<Store<State>> = Symbol('')

export default createStore<State>({
  state: deepClone(defaultState),
  mutations: {
    setSelectWalletDialog(state, isShow) {
      state.selectWalletDialog = isShow
    },
    setIsMobile(state, isMobile) {
      state.isMobile = isMobile
    },
    setIsLegalRegion(state, isLegalRegion) {
      state.isLegalRegion = isLegalRegion
    },
    setShowBalance(state, showBalance) {
      state.showBalance = showBalance
    },
    triggerShowBalance(state) {
      state.showBalance = !state.showBalance
    },
    setLastWallet(state, lastWallet) {
      state.lastWallet = lastWallet
    },
  },
  actions: {},
  getters: {},
  devtools: true,
})
