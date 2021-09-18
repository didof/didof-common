import { createApp } from 'vue'
import Playground from './dev.vue'
import DidofCommon from '@/entry.esm'

const app = createApp(Playground)
app.use(DidofCommon.components)
app.use(DidofCommon.directives)

document.body.style.margin = 0

app.mount('#app')
