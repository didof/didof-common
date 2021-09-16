<template>
  <div ref="el">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, onUpdated } from 'vue'

export default defineComponent({
  name: 'z-box',
  props: {
    z: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 10000,
    },
  },
  setup(props) {
    const { z, duration } = toRefs(props)

    const el = ref(null)
    const animator = makeAnimator(el)

    onMounted(animator.start)
    onUpdated(animator.update)

    function makeAnimator(el) {
      let animation

      return {
        start() {
          animate()
        },
        update() {
          animation.pause()
          animate()
        },
      }

      function animate() {
        animation = el.value.animate(
          [{ transform: `translateZ(${z.value}px)` }],
          {
            duration: duration.value,
            direction: 'alternate',
            iterations: Infinity,
            easing: 'ease-in-out',
          }
        )
      }
    }

    return {
      z,
      el,
    }
  },
})
</script>
