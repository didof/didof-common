<template>
  <div id="demo">
    <!-- <WindowSizesProvider>
    <div v-center v-height id="demo">
      <FrontSprint :items="items" :gap="gap">
        <template #default="slotProps">
          <div v-box v-center>
            <img :src="slotProps.item.src" />
          </div>
        </template>
      </FrontSprint>
    </div>
  </WindowSizesProvider> -->
    <TwoFaces>
      <template #front>
        <div class="test1">
          front card
        </div>
      </template>
      <template #back>
        <div class="test2">
          back card
        </div>
      </template>
    </TwoFaces>
  </div>
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
        src: `https://picsum.photos/seed/${index}/130`,
        index,
      }))
    )

    setTimeout(() => {
      gap.value = 300
      setTimeout(() => {
        gap.value = 50
      }, 3000)
    }, 3000)

    return {
      items,
      gap,
    }
  },
})
</script>

<style scoped>
#demo {
  margin-top: 30%;
}

.test1 {
  width: 150px;
  background: red;
}

.test2 {
  height: 200px;
  background: blue;
}
</style>
