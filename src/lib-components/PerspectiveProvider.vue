<template>
  <div :style="{ perspective }">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, provide } from 'vue'

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

    provide('perspective', perspective)

    return { perspective }
  },
})
</script>
