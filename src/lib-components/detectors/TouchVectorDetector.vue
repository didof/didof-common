<template>
  <div ref="el" draggable="true" @touchstart="touchstart">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watchEffect, onMounted } from 'vue'

export default defineComponent({
  name: 'mouse-vector-detector',
  props: {
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    disableTimeout: {
      type: Number,
      required: false,
    },
  },
  setup(props, context) {
    const { width, height, disableTimeout } = toRefs(props)
    const el = ref(null)

    let disabled = false
    let active = false
    let movesCounter = 0
    let movesLimit = 10

    let from = [null, null]

    watchEffect(() => {
      if (!width.value || !height.value) return
      el.value.style.width = width.value + 'px'
      el.value.style.height = height.value + 'px'
    })

    return {
      el,
      touchstart,
    }

    function touchstart(event) {
      // do only once if props.moving === false
      const [x, y] = getTargetCoords(event)

      if (disabled) return
      active = true
      from = [x, y]

      console.log(from)
    }

    function getTargetCoords(event) {
      const { right, bottom } = el.value.getBoundingClientRect()
      const { clientX, clientY } = event.touches[0]

      const x = width.value - (right - clientX)
      const y = height.value - (bottom - clientY)

      return [x, y]
    }
  },
})
</script>

<style scoped>
div {
  user-select: none;
}
</style>
