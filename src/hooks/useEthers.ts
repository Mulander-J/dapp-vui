import { computed, markRaw, ref, Ref } from 'vue'
import { Web3Provider, Network, ExternalProvider } from '@ethersproject/providers'
import { Signer } from 'ethers'
import { WalletProvider } from './useWallet'

export type { Web3Provider, Signer, Network }

const isActivated = ref(false)
const provider = ref<Web3Provider | null>(null)
const signer = ref<Signer | null>(null)
const network = ref<Network | null>(null)
const address = ref('')
const ens = ref('')
const balance = ref<bigint>(BigInt(0))

const deactivate = () => {
  isActivated.value = false
  provider.value = null
  signer.value = null
  network.value = null
  address.value = ''
  ens.value = ''
  balance.value = BigInt(0)
}

async function activate(walletProvider: WalletProvider) {
  if (!walletProvider) throw new Error('Failed to activate: missing provider')

  const _provider = new Web3Provider(walletProvider as ExternalProvider)
  const _signer = _provider.getSigner()
  const _network = await _provider.getNetwork()
  const _address = await _signer.getAddress()
  const _ens = await getENS(_provider, _address)
  const _balance = await _signer.getBalance()

  provider.value = markRaw(_provider)
  signer.value = markRaw(_signer)
  network.value = _network
  address.value = _address
  ens.value = _ens
  balance.value = _balance.toBigInt()

  isActivated.value = true
}

export function useEthers() {
  const chainId = computed(() => network.value?.chainId)

  return {
    // state
    isActivated,
    provider: provider as Ref<Web3Provider | null>, // for fixing index.d.ts compiled error, see issue/10:
    signer: signer as Ref<Signer | null>,
    network,
    address,
    ens,
    balance,

    // getters
    chainId,

    // methods
    activate,
    deactivate,
  }
}

const getENS = async (provider: any, address: string): Promise<string> => {
  let _ens
  try {
    _ens = await provider.lookupAddress(address)
  } catch {
    _ens = ''
  }
  return _ens || ''
}
