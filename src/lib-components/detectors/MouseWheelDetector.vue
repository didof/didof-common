<template>
  <div ref="el">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'mouse-slider',
  emits: ['wheel'],
  props: {
    itemsAmount: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const el = ref(null)
    const { itemsAmount } = toRefs(props)

    const handleMouseWheel = accumulatedHandleMouseWheel()

    onMounted(() => {
      el.value.addEventListener('wheel', handleMouseWheel)
    })

    onBeforeUnmount(() => {
      el.value.removeEventListener('wheel', handleMouseWheel)
    })

    return {
      el,
    }

    function accumulatedHandleMouseWheel(timeout = 300) {
      let position = 0
      let interval

      return function handleMouseWheel({ wheelDelta }) {
        const sign = Math.sign(wheelDelta) * -1
        position += sign

        clearInterval(interval)
        interval = setTimeout(() => {
          if (position < 0) position = 0
          if (position > itemsAmount.value) position = itemsAmount.value
          context.emit('wheel', position)
        }, timeout)
      }
    }
  },
})
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
