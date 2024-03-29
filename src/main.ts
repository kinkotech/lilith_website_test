import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import "uno.css"
import './styles/viewport.scss'
import './styles/index.scss'

import '@/assets/js/flexible.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
