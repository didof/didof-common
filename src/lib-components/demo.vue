<template>
  <MultiLevel
    disposition="circular:clockwise-2"
    :items="items"
    :gap="gap"
    :perspective="1000"
  >
    <template #default="slotProps">
      <div v-box v-center>
        {{ slotProps.item.name }}
      </div>
    </template>
  </MultiLevel>
</template>

<script>
import { defineComponent, ref } from 'vue'
import * as components from './index'
import { registerComponents } from '../utils/register'

export default defineComponent({
  name: 'demo',
  components: registerComponents(components),
  setup() {
    const items = new Array(7).fill('test').map(index => ({
      name: index,
    }))

    const refItems = ref(items)
    const refGap = ref(300)

    return {
      items: refItems,
      gap: refGap,
    }
  },
})
</script>
