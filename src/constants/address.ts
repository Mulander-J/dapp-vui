export const MULTICALL2_ADDRESS = '0x5ba1e12693dc8f9c48aad8770482f4739beed696'

export const TOKEN_XETH_ADDRESS = ['dev', 'qa'].includes(import.meta.env.VITE_APP_MODE!)
  ? '0x77baa6a171e5084a9e7683b1f6658bf330bf0011'
  : '0xdac17f958d2ee523a2206206994597c13d831ec7'

export const STAKE_ETH2_ADDRESS = ['dev', 'qa'].includes(import.meta.env.VITE_APP_MODE!)
  ? '0x77baa6a171e5084a9e7683b1f6658bf330bf0011'
  : '0xdac17f958d2ee523a2206206994597c13d831ec7'
