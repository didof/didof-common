<template>
  <Aristidebenoist :items="items" />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { randomColor } from '@/utils/random'

export default defineComponent({
  name: 'aristidebenoist-demo',
  setup() {
    const items = ref(
      Array.from(Array(12).keys()).map(int => ({
        key: 'test-' + int,
        src: require(`@/assets/test/${int + 1}.jpg`),
        backgroundColor: randomColor(),
      }))
    )

    return { items }
  },
})
</script>
