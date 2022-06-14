import { Interface } from '@ethersproject/abi'
import MULTICALL2_ABI from './Multicall2.json'
import ERC20 from './ERC20.json'
import STAKE_XETH_ABI from './StakeXETH.json'

const ERC20Interface = new Interface(ERC20.abi)

export { MULTICALL2_ABI, ERC20, ERC20Interface, STAKE_XETH_ABI }
