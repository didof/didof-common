<template>
  <TwoFaces>
    <template #front>
      <div class="test1" v-center>
        front card
      </div>
    </template>
    <template #back>
      <div class="test2" v-center>
        back card
      </div>
    </template>
  </TwoFaces>
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
.test1 {
  width: 150px;
  background: lightgoldenrodyellow;
  border: 1px solid darkred;
  border-radius: 5px;
}

.test2 {
  height: 200px;
  background: darkred;
  border: 1px solid lightgoldenrodyellow;
  border-radius: 5px;
  color: white;
}
</style>
