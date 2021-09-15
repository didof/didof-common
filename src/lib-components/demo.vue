<template>
  <div v-center v-height id="demo">
    <MultiLevel
      disposition="circular:clockwise-5000"
      :items="items"
      :gap="gap"
      :perspective="perspective"
      :sizes="200"
    >
      <template #default="slotProps">
        <div v-box v-center>
          {{ slotProps.item.name }}
        </div>
      </template>
    </MultiLevel>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import * as components from './index'
import { registerComponents } from '../utils/register'

export default defineComponent({
  name: 'demo',
  components: registerComponents(components),
  setup() {
    const itemsList = [1, 2, 3].map(index => ({
      name: index,
    }))

    const perspective = ref(2000)
    const items = ref(itemsList)
    const gap = ref(1000)

    return {
      items,
      gap,
      perspective,
    }
  },
})
</script>

<style scoped>
#demo {
  margin: 200px;
}
</style>
