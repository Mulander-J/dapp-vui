<script lang="ts" setup>
/**
 * Vue Refs
 */
import { ref, computed, watch } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'

/**
 * Interfaces
 */
import { useEthers, useContract, useCurrentInstance } from '@/hooks'
import { displayEther, checkChainSupport, checkNumInput } from '@/utils/chainFormat'
import { shortenNumber } from '@/utils/numbers'
import { parseEther } from 'ethers/lib/utils'

/**
 * Components
 */
import EyeNum from '@/components/EyeNum.vue'
import IconHelp from '@/components/logos/Help.vue'

/**
 * Global State
 */
const MIN_DEPOSIT = 0.1 // 最小质押数(ETH)

enum StakeErrCode {
  WRONG_NETWORK = 10001,
  SYSTEM,
}

/**
 * Use Hooks
 */
const store = useStore(key)
const { proxy } = useCurrentInstance()
const { isActivated, balance, chainId } = useEthers()

/**
 * Define Variables
 */
const stakeRes = ref()
const isDealing = ref(false)
const deposite = ref()
const RateXEth = ref(0.933)
const RewardFee = ref(10)

/**
 * Computed hook
 */
const maxBalance = computed(() => Number(displayEther(balance.value)))
const isValid = computed(() => checkNumInput(deposite.value, MIN_DEPOSIT, maxBalance.value))

/**
 * Public Interface
 */

const hanldeMax = () => {
  deposite.value = maxBalance.value
}

const handleSubmit = async () => {
  isDealing.value = true
  try {
    if (!isActivated.value) throw new Error('Please connect wallet')
    if (isNaN(deposite.value)) throw new Error('Numbers Only')
    if (deposite.value < MIN_DEPOSIT)
      throw new Error('The staking amount must be larger than or equal to 0.01 ETH')
    if (deposite.value > maxBalance.value) throw new Error('Insufficient balance')
    deposite.value = checkNumInput(deposite.value, MIN_DEPOSIT, maxBalance.value)
    if (!isValid.value) throw new Error('Incorrect amount')

    //  TODO CONTRACT STAKE
    const { StakeEth2Contract } = useContract()

    const payloads = ['0x77baa6a171e5084a9e7683b1f6658bf330bf0011', parseEther(deposite.value)]
    console.log('[payloads]', payloads)
    const depositRes = await StakeEth2Contract.approve(...payloads)

    const notifyBody = {
      status: 'info',
      deposite: deposite.value,
      recevied: deposite.value,
      txHash: depositRes.txHash,
    }
    proxy.$notify.waitTx({ title: 'Waiting for Comfirm' }, notifyBody)

    setTimeout(() => {
      proxy.$notify.waitTx({ title: 'Success' }, { ...notifyBody, status: 'success' })
      isDealing.value = false
    }, 5000)
  } catch (err: any) {
    proxy.$notify.error(err.message)
    isDealing.value = false
  }
}

/**
 * Watch hook
 */
watch(
  chainId,
  () => {
    if (isActivated.value) {
      if (!checkChainSupport(Number(chainId.value))) {
        stakeRes.value = {
          code: StakeErrCode.WRONG_NETWORK,
          title: 'Mainnet incorrect！',
          message: ['1. Click your Wallet icon.', '2. Choose the "Ethereum Mainnet"'],
        }
        return
      }
    }
    stakeRes.value = null
  },
  { deep: true, immediate: true },
)
</script>
<template>
  <div class="wrapper" :class="[stakeRes && 'show-err']">
    <div class="form">
      <div class="row">
        <p class="desc flex-row">
          <label>Balance (ETH) : <EyeNum :num="displayEther(balance)" /> </label>
          <c-button type="text" color="light" @click="hanldeMax">Max</c-button>
        </p>
        <el-input
          v-model.lazy="deposite"
          autofocus
          type="number"
          placeholder="Enter amount(Numbers Only)"
          :max="maxBalance"
          @mousewheel.prevent
        />
      </div>
      <div class="row accent">
        <p class="desc flex-row">
          <label>Receive (XETH) </label>
        </p>
        <el-input v-model="deposite" readonly />
      </div>
      <div class="row">
        <p class="desc flex-row">
          <label>Rate<IconHelp content="Rate" /></label>
          <span>1ETH = {{ shortenNumber(RateXEth, 18) }}XETH</span>
        </p>
      </div>
      <div class="row">
        <p class="desc flex-row">
          <label
            >RewardFee
            <IconHelp content="RewardFee" />
          </label>
          <span>1ETH = {{ shortenNumber(RewardFee, 2) }}%</span>
        </p>
      </div>
      <div class="actions">
        <Transition name="scale" mode="out-in">
          <c-button v-if="!isActivated" @click="store.commit('setSelectWalletDialog', true)"
            >Connect Wallet</c-button
          >
          <c-button v-else color="accent" :disabled="!isValid" @click="handleSubmit"
            >Submit</c-button
          >
        </Transition>
      </div>
    </div>
    <div class="err-tips" v-if="stakeRes">
      <h4 v-if="stakeRes.title">{{ stakeRes.title }}</h4>
      <section>
        <p v-for="(msg, mi) in stakeRes.message" :key="mi">{{ msg }}</p>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  border-radius: 48px;
  border: 2px solid transparent;
  .form {
    background: linear-gradient(317.3deg, #0e0d13 2.44%, #1e1c26 98.73%);
    border-radius: 48px;

    padding: 42px 32px;
    .row {
      margin-bottom: 32px;
      .desc {
        justify-content: space-between;
        align-items: center;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: rgba(251, 251, 255, 0.8);
        margin-bottom: 10px;
      }
    }

    .actions .cbtn {
      width: 100%;
      box-sizing: border-box;
    }
  }
}
.show-err {
  background: $error-color;
  border-color: $error-color;
  .err-tips {
    text-align: center;
    padding: 12px;
    border-bottom-left-radius: 48px;
    border-bottom-right-radius: 48px;
    h4 {
      font-style: normal;
      font-size: 18px;
      font-family: Poppins SemiBold;
      font-weight: 600;
      line-height: 24px;
    }
    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      text-align: center;
      font-family: Poppins Medium;
    }
  }
}
</style>
