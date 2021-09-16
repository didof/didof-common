<template>
  <div v-width v-height>
    <slot></slot>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  provide,
} from 'vue'

function useDebounce(func, timeout = 300) {
  let timer
  return function debounce(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export default defineComponent({
  name: 'window-sizes-watcher',
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

    const debouncedHandleResize = useDebounce(handleResize)

    onMounted(() => {
      window.addEventListener('resize', debouncedHandleResize)
    })

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
