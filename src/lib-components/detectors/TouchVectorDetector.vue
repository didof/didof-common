<template>
  <div
    ref="el"
    draggable="true"
    @touchstart.passive="touchstart"
    @touchend.passive="touchend"
    @touchleave.passive="touchleave"
    @touchmove.passive="touchmove"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watchEffect } from 'vue'
import ScrollManager from '../../utils/ScrollManager'

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
      touchstart: touchEventDecorator(touchstart),
      touchend,
      touchleave: touchEventDecorator(touchleave),
      touchmove: touchEventDecorator(touchmove),
    }

    function touchmove({ x, y }) {
      if (disabled || !active) return
      while (movesLimit === ++movesCounter) {
        active = false
        disabled = true
        calc(x, y)
      }
    }

    function touchstart({ x, y }) {
      ScrollManager.disable()

      if (disabled) return
      active = true
      from = [x, y]
    }

    function touchend() {
      ScrollManager.enable()

      if (disabled) return
      active = false
    }

    function touchleave({ x, y }) {
      ScrollManager.enable()

      if (disabled) return
      if (active) calc(x, y)
      active = false
    }

    function touchEventDecorator(fn) {
      return function touchEvent(event) {
        const { right, bottom } = el.value.getBoundingClientRect()
        const { clientX, clientY } = event.touches[0]

        const x = width.value - (right - clientX)
        const y = height.value - (bottom - clientY)

        fn({ x, y, event })
      }
    }

    function calc(toX, toY) {
      const x = toX - from[0]
      const y = -(toY - from[1])
      const i = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      const aDeg = Math.atan2(y, x)
      const aRad = aDeg * (180 / Math.PI)
      let dir

      if (Math.abs(x) > Math.abs(y)) {
        if (Math.sign(x) === +1) dir = 'right'
        else dir = 'left'
      } else {
        if (Math.sign(y) === +1) dir = 'up'
        else dir = 'down'
      }

      context.emit('vector', {
        x,
        y,
        i,
        aDeg,
        aRad,
        dir,
      })

      if (disableTimeout.value) setTimeout(reset, disableTimeout.value)
    }

    function reset() {
      disabled = false
      active = false
      movesCounter = 0
      movesLimit = 10

      from = [null, null]
    }
  },
})
</script>

<style scoped>
div {
  user-select: none;
}
</style>
