<template>
  <div ref="box">
    perspective
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, onMounted } from 'vue'
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
    oscillation: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const perspective = toRef(props, 'perspective')
    const gap = toRef(props, 'gap')
    const oscillation = toRef(props, 'oscillation')

    const box = ref(null)

    onMounted(() => {
      const p = `perspective(${perspective.value}px)`
      const g = `translateZ(${gap.value}px)`

      box.value.style.transform = [p, g].join(' ')
    })

    return {
      gap,
      box,
    }
  },
})
</script>
