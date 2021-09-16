<template>
  <div ref="box">
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
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const gap = toRef(props, 'gap')
    const oscillation = toRef(props, 'oscillation')

    const box = ref(null)

    onMounted(() => {
      if (oscillation.value)
        box.value.animate([{ transform: `translateZ(${gap.value}px)` }], {
          duration: 7500,
          direction: 'alternate',
          iterations: Infinity,
          easing: 'ease-in-out',
        })
    })

    return {
      gap,
      box,
    }
  },
})
</script>

<style scoped>
@keyframes oscillate {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(2);
  }
}
</style>
