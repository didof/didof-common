<template>
  <div ref="box">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, onMounted, onUpdated } from 'vue'
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
  setup(props) {
    const gap = toRef(props, 'gap')

    const box = ref(null)
    let animator = makeAnimator()

    onMounted(animator.start)
    onUpdated(animator.update)

    function makeAnimator() {
      let animation

      return {
        start() {
          animate()
        },
        pause() {
          animation.pause()
        },
        update() {
          animation.pause()
          animate()
        },
      }

      function animate() {
        animation = box.value.animate(
          [{ transform: `translateZ(${gap.value}px)` }],
          {
            duration: 7500,
            direction: 'alternate',
            iterations: Infinity,
            easing: 'ease-in-out',
          }
        )
      }
    }

    function animate() {}

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
