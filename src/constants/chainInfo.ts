// Infura api key
export const INFURA_API = 'f65c0bbb601041e19fb6a106560bc9ac'

// Full ChainList
export enum ChainId {
  Mainnet = 1,
  // Ropsten = 3,
  // Rinkeby = 4,
  Goerli = 5,
  // Kovan = 42,
  // xDai = 100,
  // Polygon = 137,
  // Arbitrum = 42161,
  // Hardhat = 31337,
  // Rinkarby = 421611,
}

// Support Chains
export const SUPPORT_CHAINS: ChainId[] = ['dev', 'qa'].includes(import.meta.env.VITE_APP_MODE!)
  ? [ChainId.Goerli, ChainId.Mainnet]
  : [ChainId.Mainnet]

// ChainNode Detail
export const CHAIN_NODE: {
  [K in ChainId.Mainnet | ChainId.Goerli | number]: {
    chainId: ChainId
    name: string
    logo: string
    symbol: string
    browser: string
  }
} = {
  [ChainId.Mainnet]: {
    chainId: ChainId.Mainnet,
    name: 'Mainnet',
    symbol: 'ETH',
    logo: 'https://etherscan.io/images/svg/brands/ethereum.svg?v=1.3',
    browser: 'https://etherscan.io',
  },
  [ChainId.Goerli]: {
    chainId: ChainId.Goerli,
    name: 'Goerli',
    symbol: 'ETH',
    logo: 'https://etherscan.io/images/svg/brands/ethereum.svg?v=1.3',
    browser: 'https://goerli.etherscan.io',
  },
}

// Add Custom Network
export const NETWORK_DETAILS = {
  [ChainId.Goerli]: {
    chainId: '0x' + ChainId.Goerli.toString(16),
    chainName: 'Goerli',
    nativeCurrency: {
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
}

// Refer to https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
export interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name?: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}
