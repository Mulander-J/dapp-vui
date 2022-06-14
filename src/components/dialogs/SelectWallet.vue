<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { useWallet, WalletName, useCurrentInstance } from '@/hooks'
import {
  TERM_USE_LINK,
  PRIVACY_POLICY_LINK,
  STROGE_KEY_WALLET,
  INFURA_API,
  SUPPORT_CHAINS,
} from '@/constants'
import { Metamask, MetaMaskProvider } from '@/plugins/wallets/metamask'
import { Walletconnect } from '@/plugins/wallets/walletconnect'
import { Walletlink } from '@/plugins/wallets/walletlink'

import NoticeModal from './index.vue'
import WalletLogo from './../logos/WalletLogo.vue'

const store = useStore(key)
const triggerDialog = () => {
  store.commit('setSelectWalletDialog', false)
}
const { proxy } = useCurrentInstance()
const { connect, disconnect, isLoading, isConnected, error, provider } = useWallet()

const walletList: WalletName[] = ['none', 'metamask', 'walletconnect', 'walletlink']
const walletLableList: string[] = ['none', 'MetaMask', 'Wallet Connect', 'Coinbase Wallet']

const executeIndex: any = ref(-1)
const isAccept = ref(false)
const tempLoading = ref(false)
const afterConnect = ref(false)
const walletDetect = ref({
  metamask: false,
  walletconnect: false,
  walletlink: false,
})

const checkWalletDetect = async (name: WalletName) => {
  switch (name) {
    case 'metamask':
      return (walletDetect.value.metamask = await Metamask.check())
    case 'walletconnect':
      return (walletDetect.value.walletconnect = await Walletconnect.check())
    case 'walletlink':
      return (walletDetect.value.walletlink = await Walletlink.check())
    default:
      return false
  }
}

const handleConnect = async (walletIndex = 1) => {
  if (!isAccept.value) {
    proxy.$notify.warning('Please accept the term & policy first.')
    return
  }

  // Avoid overload
  if (isLoading.value || tempLoading.value) return

  tempLoading.value = true
  afterConnect.value = false

  try {
    //  Get Wallet Name
    const name = walletList[walletIndex]
    if (!name || name === 'none') {
      throw Error('No Wallet Selected')
    }
    executeIndex.value = walletIndex

    // Check metamask and walletconnect available
    const isGoOn = await checkWalletDetect(name)
    if (!isGoOn) {
      proxy.$notify.noWallet() // Notify to install MetaMask Plugin
      return
    }

    // Switch chain if connected
    if (
      provider.value &&
      store.state.lastWallet === name &&
      ['metamask', 'walletlink'].includes(name)
    ) {
      await Metamask.switchChain(provider.value as MetaMaskProvider, SUPPORT_CHAINS[0])
      triggerDialog()
      return
    }

    // Execute connect
    await disconnect()
    await connect(name, INFURA_API, 'DAPP VUI')

    //  Check errors
    if (error.value) {
      throw Error(error.value)
    }

    //  Check isConnected
    if (isConnected.value) {
      proxy.$notify.success({ message: 'Wallet Connect Successed', duration: 1200 })
      sessionStorage.setItem(STROGE_KEY_WALLET, name)
      store.commit('setLastWallet', name)
      afterConnect.value = true // trigger animation
      setTimeout(triggerDialog, 2000)
    }
  } catch (err: any) {
    console.log('[handleConnect-Err]', err)
    proxy.$notify.error(err?.message || 'Wallet Connect Failed')
    sessionStorage.removeItem(STROGE_KEY_WALLET)
    disconnect()
  } finally {
    tempLoading.value = false
  }
}

watch(
  () => store.state.selectWalletDialog,
  () => {
    isAccept.value = false
    afterConnect.value = false
  },
)

onMounted(async () => {
  const lastWallet: WalletName | any = sessionStorage.getItem(STROGE_KEY_WALLET)
  store.commit('setLastWallet', lastWallet)
  walletList.includes(lastWallet) && (await connect(lastWallet, INFURA_API, 'DAPP VUI'))
})
</script>
<template>
  <NoticeModal
    :show="store.state.selectWalletDialog"
    @okCb="triggerDialog"
    @cancelCb="triggerDialog"
    :width="364"
    no-esc-mask
  >
    <h4>Connect Wallet to Start</h4>
    <p class="accept-rows">
      <el-checkbox v-model="isAccept" style="margin-right: 8px" />
      I agree to
      <c-button color="light" type="text" :href="TERM_USE_LINK">Terms of Use</c-button>
      &nbsp;&
      <c-button color="light" type="text" :href="PRIVACY_POLICY_LINK">Privacy Policy</c-button>.
    </p>
    <div class="wallet-rows">
      <div
        v-for="w in 3"
        :key="w"
        class="wallet-items flex-row"
        :class="[isAccept && 'accpted']"
        @click="handleConnect(w)"
      >
        <div class="avatar">
          <WalletLogo
            :name="walletList[w]"
            :status="
              executeIndex !== w
                ? 'stable'
                : tempLoading || isLoading
                ? 'pending'
                : afterConnect
                ? 'done'
                : 'stable'
            "
          />
        </div>
        <span>{{ walletLableList[w] }}</span>
      </div>
    </div>
  </NoticeModal>
</template>
<style lang="scss" scoped>
h4 {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: left;
  font-family: Poppins SemiBold;
}
.accept-rows {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  flex-flow: row wrap;
  .cbtn {
    margin-left: 8px;
    font-weight: normal !important;
    font-size: 14px !important;
    font-family: Poppins !important;
    text-transform: capitalize;
  }
}
.wallet-rows {
  display: grid;
  grid-gap: 12px;
  grid-template-columns: 1fr;
  margin-top: 43px;
  .wallet-items {
    position: relative;
    user-select: none;
    cursor: not-allowed;
    justify-content: space-between;
    overflow: hidden;
    text-transform: capitalize;
    transition: all 0.1s ease-in-out;
    font-style: normal;
    font-weight: 600;
    font-family: Poppins SemiBold;
    font-size: 16px;
    line-height: 24px;
    border-radius: 12px;
    padding: 12px 24px;
    background: #19174d;
    &:hover {
      background: #635fff;
    }

    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      top: 0;
      left: 0;
      background: rgba(110, 118, 197, 0.6);
    }
    .avatar {
      width: 24px;
      height: 24px;
    }
  }
  .accpted {
    cursor: pointer;
    &::after {
      display: none;
    }
  }
}
</style>
