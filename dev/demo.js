import { createApp } from 'vue'
import Demo from './demo.vue'
import DidofCommon from '@/entry.esm'

const app = createApp(Demo)
app.use(DidofCommon.components)
app.use(DidofCommon.directives)

document.body.style.margin = 0

app.mount('#app')
