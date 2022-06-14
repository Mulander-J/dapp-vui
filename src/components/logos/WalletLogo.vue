<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { WalletName } from '@/hooks'

import LogoMetaMask from './MetaMask.vue'
import LogoWalletConnect from './WalletConnect.vue'
import LogoWalletLink from './WalletLink.vue'

type WalletStatus = 'stable' | 'pending' | 'done'

export default defineComponent({
  name: 'wallet-logo',
  props: {
    name: {
      type: String as PropType<WalletName>,
      required: true,
    },
    status: {
      type: String as PropType<WalletStatus>,
      default: 'stable',
    },
  },
  setup(props) {
    // 渲染的组件类型
    const currentElementComponent = computed(() => {
      const elementTypeMap: any = {
        metamask: LogoMetaMask,
        walletconnect: LogoWalletConnect,
        walletlink: LogoWalletLink,
      }
      return elementTypeMap[props.name] || null
    })

    return {
      currentElementComponent,
    }
  },
})
</script>

<template>
  <TransitionGroup name="scale" mode="out-in">
    <!-- Icon Connecting -->
    <img
      class="w-logo"
      v-if="status === 'pending'"
      src="@/assets/img/common/loading.svg"
      key="loading"
    />
    <!-- Icon Connected -->
    <div class="w-logo checker" v-else-if="status === 'done'" key="done" />
    <!-- Icon Wallet Logo -->
    <component class="w-logo" v-else :is="currentElementComponent" key="logo" />
  </TransitionGroup>
</template>

<style scoped lang="scss">
.w-logo {
  width: 100%;
  height: 100%;
}
.checker {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 50%;
  background: transparent;
  border: 4px solid rgba(165, 220, 134, 0.2);
  border-left-color: $success-color;
  animation: animation_collect 1s linear 1 both;
}

@keyframes animation_collect {
  0% {
    transform: rotate(270deg);
    border-left-color: $success-color;
  }
  25% {
    border-left-color: $success-color;
  }
  50% {
    border-left-color: $success-color;
  }
  75% {
    border-left-color: $success-color;
  }
  100% {
    border-left-color: rgba(165, 220, 134, 0.2);
    transform: rotate(0deg);
    background: $success-color;
  }
}

.checker::before {
  position: absolute;
  content: '';
  top: 50%;
  left: 0;
  border: 4px solid #0a1521;
  border-left-width: 0;
  border-bottom-width: 0;
  transform: scaleX(-1) rotate(135deg);
  transform-origin: left top;
  animation: animation_true 0.5s 1s linear 1 both;
  opacity: 0;
}

@keyframes animation_true {
  0% {
    opacity: 0;
    width: 0px;
    height: 0px;
  }
  33% {
    opacity: 1;
    width: 30%;
    height: 0px;
  }
  100% {
    opacity: 1;
    width: 30%;
    height: 60%;
  }
}
</style>
