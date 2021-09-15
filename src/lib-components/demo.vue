<template>
  <div v-center v-height id="demo">
    <MultiLevel
      disposition="circular:clockwise-5000"
      :items="items"
      :gap="gap"
      :perspective="perspective"
      :sizes="380"
    >
      <template #default="slotProps">
        <div v-center class="box">
          <img :src="slotProps.item.name" />
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
    const items = ref(
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(index => ({
        name: `https://picsum.photos/seed/${index}/200`,
      }))
    )

    const perspective = ref(800)
    const gap = ref(300)

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

.box {
  width: 200px;
  height: 200px;
}
</style>
