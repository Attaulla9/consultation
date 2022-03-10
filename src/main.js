import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/main.css"
import axios from 'axios'

const app = createApp(App).use(store).use(router)

app.config.globalProperties.axios=axios

app.mount('#app')
