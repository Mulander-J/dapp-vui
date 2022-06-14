import detectEthereumProvider from '@metamask/detect-provider'
import { providers } from 'ethers'
import { checkChainId } from '@/utils/chainFormat'
import { NETWORK_DETAILS, ASSET_DETAIL, AddEthereumChainParameter } from '@/constants'

const ERRCODE_NETWORK_UNADD = 4902

// Provider Docs: https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents
// JSON RPC API: https://metamask.github.io/api-playground/api-documentation

export interface MetaMaskProvider extends providers.ExternalProvider {
  isMetaMask: boolean
  isConnected: () => boolean
  request: (request: { method: string; params?: any[] | any | undefined }) => Promise<any>
  on: (event: string, callback: (param: any) => void) => void
  providers: Array<any>
}

export interface MetaMaskProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export class Metamask {
  static async check(): Promise<boolean> {
    const provider = await detectEthereumProvider()
    return provider ? true : false
  }

  static async connect() {
    const ethProvider = (await detectEthereumProvider()) as MetaMaskProvider
    const isMulti = ethProvider?.providers?.length || 0
    const provider = isMulti ? ethProvider.providers.find((e: any) => e.isMetaMask) : ethProvider

    // await provider.request({
    //   method: 'wallet_requestPermissions',
    //   params: [{ eth_accounts: {} }],
    // })

    await provider.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {} }],
    })

    return provider
  }

  static async switchChain(provider: MetaMaskProvider, chainId: number) {
    try {
      if (!provider.isMetaMask) {
        const errUMT: MetaMaskProviderRpcError = {
          code: ERRCODE_NETWORK_UNADD,
          ...new Error('UnMetamaskType Switch'),
        }
        throw errUMT
      }
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainId.toString(16) }], // chainId must be in hexadecimal numbers
      })
    } catch (err: any) {
      console.log('[ SwitchChain ]', err)
      try {
        if (err.code === ERRCODE_NETWORK_UNADD && checkChainId(chainId)) {
          await Metamask.addChain(
            provider,
            NETWORK_DETAILS[chainId as keyof typeof NETWORK_DETAILS],
          )
          return
        }
      } catch (err: any) {
        throw new Error(`Failed to add new chain: ${err.message}`)
      }
      throw new Error(`Failed to switch chain: ${err.message}`)
    }
  }

  static async addChain(provider: MetaMaskProvider, networkDetails: AddEthereumChainParameter) {
    return provider.request({
      method: 'wallet_addEthereumChain',
      params: [networkDetails], // chainId must be in hexadecimal numbers
    })
  }

  static async addToken(provider: MetaMaskProvider, assetId: number) {
    return provider.request({
      method: 'metamask_watchAsset',
      params: ASSET_DETAIL[assetId as keyof typeof ASSET_DETAIL],
    })
  }
}
