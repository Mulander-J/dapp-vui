import { BigNumber } from 'ethers'
import { formatEther, isAddress } from 'ethers/lib/utils'
import { ChainId, SUPPORT_CHAINS, CHAIN_NODE } from '@/constants'
import { shortenNumber } from './numbers'

export const checkChainId = (chainId: number) => chainId in ChainId

export const checkChainSupport = (chainId: number) => SUPPORT_CHAINS.includes(chainId)

export const getChainNode = (chainId: number) =>
  CHAIN_NODE?.[chainId] || {
    chainId: ChainId.Mainnet,
    name: 'Mainnet',
    symbol: 'ETH',
    logo: '',
    browser: '',
  }

export const displayEther = (balance: BigNumber | bigint, fixed = 4) =>
  shortenNumber(+formatEther(balance), fixed)

export const shortenAddress = (address: string): string => {
  if (isAddress(address)) {
    return address.slice(0, 6) + '...' + address.slice(-4)
  } else {
    return ''
  }
}

export const addressToNumber = (address: string) => parseInt(address.slice(2, 10), 16)

export const checkNumInput = (num: string | number, min: number, max: number) => {
  const _num = Number(num)
  if (!_num || _num <= 0) return ''
  else if (min && _num < min) return ''
  else if (max && _num > max) return ''
  else {
    const _strArr: string[] = num.toString().split('.')
    _strArr[1] && (_strArr[1] = _strArr[1].slice(0, 18))
    return _strArr.join('.')
  }
}

export const getOutLink = (type: 'token' | 'tx' | 'address', address: string, chainId?: number) => {
  const DEFAULT_CHAIN = CHAIN_NODE[chainId || SUPPORT_CHAINS[0]]
  return `${DEFAULT_CHAIN.browser}/${type}/${address}`
}
