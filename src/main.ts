import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { registerSW } from 'virtual:pwa-register'
import ui from '@nuxt/ui/vue-plugin'

import App from './App.vue'

// registerSW({ immediate: true })

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(ui)

app.mount('#app')
