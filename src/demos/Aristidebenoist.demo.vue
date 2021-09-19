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
      Array.from(Array(1).keys()).map(int => ({
        key: 'ciao-' + int,
        src: require('@/assets/testimage.png'),
        color: 'blue',
      }))
    )

    return { items }
  },
})
</script>
