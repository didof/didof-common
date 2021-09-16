<template>
  <div v-center v-height id="demo">
    <FrontSprint :items="items">
      <template #default="slotProps">
        <div v-box>
          <img :src="slotProps.item.src" />
        </div>
      </template>
    </FrontSprint>
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
      [1, 2, 3, 4, 5, 6, 7, 8].map(index => ({
        src: `https://picsum.photos/seed/${index}/100`,
        index,
      }))
    )

    return {
      items,
    }
  },
})
</script>

<style scoped>
#demo {
  margin-top: 200px;
}

.box {
  background: grey;
  width: 100px;
  height: 100px;
}
</style>
