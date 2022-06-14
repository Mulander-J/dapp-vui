import { markRaw } from 'vue'

import { Contract } from '@ethersproject/contracts'
import { useEthers } from './useEthers'

import { STAKE_ETH2_ADDRESS } from '@/constants'
import { STAKE_XETH_ABI } from '@/constants/abi'

export function useContract() {
  const {
    signer,
    //  address,
  } = useEthers()

  const StakeEth2Contract = markRaw(
    new Contract(STAKE_ETH2_ADDRESS, STAKE_XETH_ABI as any, signer.value as any),
  )

  return {
    //  contractInstance
    StakeEth2Contract,

    // apis
  }
}
