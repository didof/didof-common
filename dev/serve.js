import { createApp } from 'vue'
import App from './serve.vue'
import DidofCommon from '@/entry.esm'

const app = createApp(App)
app.use(DidofCommon.components)
app.use(DidofCommon.directives)

document.body.style.margin = 0

app.mount('#app')
