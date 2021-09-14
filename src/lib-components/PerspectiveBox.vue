<template>
  <div
    :style="{
      transform: `perspective(${perspective}px) translateZ(${gap}px)`,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'perspective-box',
  props: {
    perspective: {
      type: Number,
      default: 200,
    },
    gap: {
      type: Number,
      required: true,
    },
  },
})
</script>
