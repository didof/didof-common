<template>
  <Aristidebenoist :items="items">
    <!-- <template #top-left>
      <h1>Francesco</h1>
    </template>
    <template #top-right>
      <h4>about</h4>
    </template>
    <template #bottom-left>
      <a href="mailto:didonato.fr@gmail.com">Let's chat</a>
    </template>
    <template #bottom-right>
      <ul>
        <li>
          <a href="https://github.com/didof">Didof</a>
        </li>
        <li>
          <a href="https://twitter.com/did0f">Twitter</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/didof/">LinkedIn</a>
        </li>
      </ul>
    </template> -->
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
