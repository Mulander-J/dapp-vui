import { createApp } from 'vue'
import App from '@/App.vue'
import store, { key } from './store'
import Router from './router'
import usePlugin from './plugins'

const app = createApp(App)

app.use(Router)
app.use(store, key)
usePlugin(app)
app.mount('#app')
