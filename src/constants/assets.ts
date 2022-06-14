import { TOKEN_XETH_ADDRESS } from './address'

// Refer to https://docs.metamask.io/guide/rpc-api.html#wallet_watchAsset
// Refer to https://eips.ethereum.org/EIPS/eip-747
export interface WatchAssetParams {
  type: 'ERC20' // In the future, other standards will be supported
  options: {
    address: string // The address of the token contract
    symbol: string // A ticker symbol or shorthand, up to 5 characters
    decimals: number // The number of token decimals
    image: string // A string url of the token logo
  }
}

export enum ERC20TokenId {
  XETH = 1,
}

// Add Custom Asset.Token
export const ASSET_DETAIL = {
  [ERC20TokenId.XETH]: {
    type: 'ERC20',
    options: {
      address: TOKEN_XETH_ADDRESS,
      symbol: 'USDT',
      decimals: 6,
      image: `https://raw.githubusercontent.com/trustwallet/assets/ec4f6c94a95bcddda22fe25659cf02d1d5d67bfc/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png`,
    },
  },
}
