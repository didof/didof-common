<template>
  <div :style="{ perspective: perspective + 'px' }">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, provide, toRefs, readonly } from 'vue'

export default defineComponent({
  name: 'perspective-provider',
  props: {
    perspective: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { perspective } = toRefs(props)

    provide('perspective', readonly(perspective))

    return { perspective }
  },
})
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
