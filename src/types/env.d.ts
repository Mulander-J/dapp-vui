/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_STATIC_URL: string
  readonly VITE_APP_MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface Window {
  ethereum?: any
  walletlink?: any
}

declare module 'vue-clipboard3'
// declare module 'ethers'

declare type Nullable<T> = T | null

// 声名图片文件资源
declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
