<template>
  <Aristidebenoist :items="items">
    <template #top-left>
      <h1>title</h1>
    </template>
    <template #top-right>
      <h6>about</h6>
    </template>
    <template #bottom-left>
      <a href="mailto:didonato.fr@gmail.com">didof</a>
    </template>
    <template #bottom-right>
      social
    </template>
  </Aristidebenoist>
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
