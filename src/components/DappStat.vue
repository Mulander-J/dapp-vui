<script lang="ts" setup>
/**
 * Vue Refs
 */
import { computed } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
import useClipboard from 'vue-clipboard3'

/**
 * Interfaces
 */
import { useEthers, useWallet, useCurrentInstance } from '@/hooks'
import { shortenAddress, checkChainSupport, displayEther, getOutLink } from '@/utils/chainFormat'
import { STROGE_KEY_WALLET } from '@/constants'

/**
 * Components
 */
import EyeNum from './EyeNum.vue'
import Dropdown from './Dropdown.vue'
import WalletLogo from './logos/WalletLogo.vue'
import EthBlockies from './EthBlockies.vue'

/**
 * Use Hooks
 */
const { proxy } = useCurrentInstance()
const store = useStore(key)
const { address, ens, chainId, balance } = useEthers()
const { disconnect, isConnected, isLoading } = useWallet()

/**
 * Computed Hooks
 */
const isSupported = computed(() => checkChainSupport(Number(chainId.value)))
const outBrowser = computed(() => getOutLink('address', address.value))

/**
 * Public Interface
 */

/**
 * @description Logout & disconnect wallet
 */
const handleLogout = async () => {
  sessionStorage.removeItem(STROGE_KEY_WALLET)
  await disconnect()
  proxy.$notify.success('Disconnect successed')
}

/**
 * @description Daddy called me to copy some text
 */
const handleCopy = async () => {
  const { toClipboard } = useClipboard()
  try {
    await toClipboard(address.value)
    proxy.$notify.success('Copied to Clipboard')
  } catch (e) {
    proxy.$notify.error('Copy Failed')
    console.error(e)
  }
}
</script>

<template>
  <div class="wrapper">
    <Transition name="scale" mode="out-in">
      <img v-if="isLoading" src="@/assets/img/common/loading.svg" />
      <div class="walletNav" key="user" v-else-if="isConnected && address">
        <div class="userStat" v-if="isSupported">
          <EthBlockies class="avatar" :seed="address" />
          <div class="right">
            <div class="r-top flex-row">
              <span :title="address">{{ ens || shortenAddress(address) }}</span>
              <div class="wallet-logo">
                <WalletLogo :name="store.state.lastWallet" />
              </div>
            </div>
            <div class="r-bottom flex-row">
              <EyeNum show-trigger unit="ETH" :num="displayEther(balance)" />
            </div>
          </div>
          <Dropdown
            :items="[
              {
                linkType: 'event',
                linkContent: 'Copy Address',
                imgSrc: $getStatic('/common/copy.svg'),
                onClick: handleCopy,
              },
              {
                linkType: 'link',
                linkContent: 'View on Etherscan',
                imgSrc: $getStatic('/common/view-web.svg'),
                link: outBrowser,
              },
              {
                linkType: 'event',
                linkContent: 'Disconnect',
                imgSrc: $getStatic('/common/disconnect.svg'),
                onClick: handleLogout,
              },
            ]"
          >
            <template #target>
              <div class="navTrigger">
                <img :src="$getStatic('/common/drag-down.svg')" alt="" />
              </div>
            </template>
          </Dropdown>
        </div>
        <c-button
          type="outline"
          color="light"
          v-else
          @click="store.commit('setSelectWalletDialog', true)"
          >UnSupported Network</c-button
        >
      </div>
      <c-button key="action" v-else @click="store.commit('setSelectWalletDialog', true)">
        Connect Wallet
      </c-button>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: inline-flex;
  align-items: center;
  .walletNav {
    .userStat {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      user-select: none;
      .avatar {
        margin: 0 1rem;
        height: 56px;
        width: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #434377;
        border-radius: 12px;
      }
      .right {
        margin-left: 9px;
        margin-right: 50px;
        font-weight: 600;
        font-size: 16px;
        font-family: Poppins SemiBold;
        .r-top {
          .wallet-logo {
            width: 24px;
            height: 24px;
            margin-left: 4px;
            svg {
              height: 100%;
              width: 100%;
            }
          }
        }
        .r-bottom {
          height: 24px;
          box-sizing: border-box;
        }
      }
      .navTrigger {
        cursor: pointer;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        background: linear-gradient(
          170.17deg,
          rgba(176, 176, 238, 0.39) 15.21%,
          rgba(67, 67, 119, 0.39) 85.79%
        );
        backdrop-filter: blur(14px);
        img {
          transition: 0.18s ease-in-out;
        }
      }
      .dropdown-trigger-active {
        .navTrigger {
          opacity: 1;
          img {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>
