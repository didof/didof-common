<template>
  <div
    ref="el"
    draggable="false"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseleave="mouseleave"
    @mousemove="mousemove"
    @mouseover="mouseover"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, watchEffect } from 'vue'

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
      mousedown,
      mouseup,
      mouseleave,
      mousemove,
      mouseover,
    }

    function mouseover() {
      el.value.style.cursor = 'grab'
    }

    function mousemove(event) {
      if (disabled || !active) return
      el.value.style.cursor = 'move'
      while (movesLimit === ++movesCounter) {
        active = false
        disabled = true
        calc(event.offsetX, event.offsetY)
      }
    }

    function mousedown(event) {
      el.value.style.cursor = 'grabbing'
      if (disabled) return
      active = true
      from = [event.offsetX, event.offsetY]
    }

    function mouseup() {
      if (disabled) return
      el.value.style.cursor = 'grab'
      active = false
      from = [null, null]
    }

    function mouseleave(event) {
      if (disabled) return
      el.value.style.cursor = 'default'
      if (active) calc(event.offsetX, event.offsetY)
      active = false
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
