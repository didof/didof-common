<template>
  <div>
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
