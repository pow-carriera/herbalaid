import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/main.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
axios.defaults.baseURL = import.meta.env.VITE_API
const app = createApp(App)
app.use(VueAxios, axios)
app.use(pinia)
app.use(router)

app.mount('#app')
