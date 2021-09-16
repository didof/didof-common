<template>
  <WindowSizesWatcher>
    <div v-center v-height id="demo">
      <FrontSprint :items="items" :gap="gap">
        <template #default="slotProps">
          <div v-box v-center>
            <!-- <img :src="slotProps.item.src" /> -->
            {{ slotProps.index }}
          </div>
        </template>
      </FrontSprint>
    </div>
  </WindowSizesWatcher>
</template>

<script>
import { defineComponent, ref } from 'vue'
import * as components from './index'
import { registerComponents } from '../utils/register'

export default defineComponent({
  name: 'demo',
  components: registerComponents(components),
  setup(props) {
    const gap = ref(100)

    const items = ref(
      [1, 2, 3, 4, 5, 6].map(index => ({
        // src: `https://picsum.photos/seed/${index}/100`,
        index,
      }))
    )

    setTimeout(() => {
      gap.value = 600
    }, 5000)

    return {
      items,
      gap,
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
