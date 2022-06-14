/*Common Utils*/
import i18n from './i18n'
import getStatic from '../assets/getStatic'
/*Global Components*/
import Button from './../components/Button.vue'
import myElNotify from './eleNotify'
/*Import Cascading Style Sheets*/
import '@/styles/element-style.scss'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $getStatic: any
  }
}

export default function usePlugin(app: any) {
  app.config.globalProperties.$getStatic = getStatic
  app.config.globalProperties.$notify = myElNotify

  app.use(i18n)
  app.component('CButton', Button)
}
