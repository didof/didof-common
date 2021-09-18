<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
// https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
import { defineComponent, ref, computed, onBeforeUnmount, provide } from 'vue'

import { useDebounce } from '@/utils/debounce'

export default defineComponent({
  name: 'window-sizes-provider',
  props: {
    debounce: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const width = ref(window.innerWidth)
    const height = ref(window.innerHeight)

    const min = computed(() => Math.min(width.value, height.value))
    const max = computed(() => Math.max(width.value, height.value))

    const isVertical = computed(() => height.value > width.value)

    provide('windowSizes', {
      width,
      height,
      min,
      max,
      isVertical,
    })

    let debouncedHandleResize = useDebounce(handleResize)

    window.addEventListener('resize', debouncedHandleResize)

    onBeforeUnmount(() => {
      window.removeEventListener('resize', debouncedHandleResize)
    })

    function handleResize() {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
  },
})
</script>
