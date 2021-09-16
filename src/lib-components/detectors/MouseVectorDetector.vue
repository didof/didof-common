<template>
  <main
    ref="el"
    draggable="false"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mouseleave="mouseleave"
    @mousemove="mousemove"
  >
    <slot></slot>
  </main>
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
      if (width.value && height.value) {
        el.value.style.width = width.value + 'px'
        el.value.style.height = height.value + 'px'
      }
    })

    return { width, height, el, mousedown, mouseup, mouseleave, mousemove }

    function mousemove(event) {
      if (disabled || !active) return
      while (movesLimit === ++movesCounter) {
        active = false
        disabled = true
        calc(event.offsetX, event.offsetY)
      }
    }

    function mousedown(event) {
      if (disabled) return
      active = true
      from = [event.offsetX, event.offsetY]
    }

    function mouseup() {
      if (disabled) return
      active = false
    }

    function mouseleave(event) {
      if (disabled) return
      if (active) calc(event.offsetX, event.offsetY)
      active = false
    }

    function calc(toX, toY) {
      const x = toX - from[0]
      const y = -(toY - from[1])
      const i = Math.sqrt(x ** 2, y ** 2)

      // FIXME Theme must be a more concise solution!

      let q
      if (x > 0) {
        if (y > 0) q = 1
        else q = 4
      } else {
        if (y > 0) q = 2
        else q = 3
      }

      let angle = Math.atan(Math.abs(y) / Math.abs(x))
      if (q === 2) {
        angle += Math.PI * 0.5
      } else if (q === 3) {
        angle += Math.PI * 1
      } else if (q === 4) {
        angle = Math.PI * 2 - angle
      }

      const payload = { angle, x, y: -y, i, q }

      context.emit('vector', payload)

      if (q === 1 || q === 2) context.emit('up', payload)
      else if (q === 1 || q === 4) context.emit('right', payload)
      else if (q === 4 || q === 3) context.emit('down', payload)
      else if (q === 3 || q === 2) context.emit('left', payload)

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
