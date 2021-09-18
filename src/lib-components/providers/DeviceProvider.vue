<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, provide } from 'vue'

export default defineComponent({
  name: 'device-provider',
  setup() {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0

    provide('isTouch', isTouchDevice)
  },
})
</script>
