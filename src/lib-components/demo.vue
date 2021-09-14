<template>
  <MultiLevel
    disposition="linear:ltr"
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

export default defineComponent({
  name: 'demo',
  components: registerComponents(),
  setup() {
    const items = [1, 2, 3, 4, 5, 6].map(index => ({
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

function registerComponents() {
  return Object.entries(components).reduce(
    (acc, [name, component]) => (acc[name] = component)
  )
}
</script>
