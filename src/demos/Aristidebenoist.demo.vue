<template>
  <div>
    <Aristidebenoist :items="items"> </Aristidebenoist>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'aristidebenoist-demo',
  setup() {
    const items = ref(
      Array.from(Array(6).keys()).map(int => ({
        key: 'test-' + int,
        src: require(`@/assets/test/${int + 1}.jpg`),
      }))
    )

    return { items }
  },
})
</script>
