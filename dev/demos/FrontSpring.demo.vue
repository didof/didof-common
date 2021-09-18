<template>
  <WindowSizesProvider>
    <div v-center v-height id="demo">
      <FrontSpring :items="items" :gap="200">
        <template #default="slotProps">
          <div v-box v-center>
            <img :src="slotProps.item.src" />
          </div>
        </template>
      </FrontSpring>
    </div>
  </WindowSizesProvider>
</template>

<script>
import { defineComponent, ref } from 'vue'

import { WindowSizesProvider, FrontSpring } from '@/lib-components'

export default defineComponent({
  name: 'front-spring-demo',
  components: { WindowSizesProvider, FrontSpring },
  setup() {
    const items = ref(
      [1, 2, 3, 4, 5, 6].map(index => ({
        src: `https://picsum.photos/seed/${index}/130`,
      }))
    )

    return {
      items,
    }
  },
})
</script>
