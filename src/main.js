import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Progressive web app
import { registerSW } from 'virtual:pwa-register'
registerSW({
  immediate: true,
  onNeedRefresh() {
    // You could show a UI prompt here. Simple approach:
    if (confirm('New version available. Reload now?')) location.reload()
  },
  onOfflineReady() {
    console.log('App is ready to work offline.')
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
