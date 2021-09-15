<template>
  <div v-center v-height id="demo">
    <MultiLevel
      disposition="circular:clockwise-5000"
      :items="items"
      :gap="gap"
      :perspective="1000"
      :sizes="300"
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
</script>

<style scoped>
#demo {
  margin-top: 200px;
}
</style>
