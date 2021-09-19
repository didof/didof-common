<template>
  <li ref="el">
    <img
      :src="src"
      @click="handleClick"
      v-clickOutside="handleClickOutside"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
    />
  </li>
</template>

<script>
import { defineComponent, ref, toRef, toRefs, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'view-tmp',
  props: {
    src: {
      type: String,
      required: true,
    },
    animationDuration: {
      type: Number,
      default: 1000,
    },
    restFraction: {
      type: Number,
      default: 0.2,
    },
  },
  setup(props, context) {
    // init
    const defaultWidth = 600
    const defaultHeight = 350

    // refs & props
    const { animationDuration, restFraction } = toRefs(props)
    const el = ref(null)

    // features
    let isOpen = false

    onMounted(() => {
      el.value.style.width = (context.attrs.width || defaultWidth) + 'px'
      el.value.style.height = (context.attrs.height || defaultHeight) + 'px'

      setShownFractionRest()

      el.value.style.transition = `${animationDuration.value}ms ease-in-out`
    })

    watch(animationDuration, () => {
      el.value.style.transition = `${animationDuration.value}ms ease-in-out`
    })

    return {
      el,
      handleClick,
      handleClickOutside,
      handleMouseOver,
      handleMouseLeave,
    }
    function handleClick() {
      isOpen = true
      setShownFraction(1)
    }

    function handleClickOutside() {
      if (!isOpen) return
      setShownFractionRest()
      isOpen = false
    }

    function handleMouseOver() {
      if (isOpen) return
      setShownFraction(restFraction.value + 0.1)
    }

    function handleMouseLeave() {
      if (isOpen) return
      setShownFractionRest()
    }

    function setShownFraction(percent) {
      const width = context.attrs.width || defaultWidth

      const pxToShow = width * percent

      const pxHider = (width - pxToShow) / 2

      el.value.style.borderLeft = `${pxHider}px solid rgba(0, 0, 0, 0)`
      el.value.style.borderRight = `${pxHider}px solid rgba(0, 0, 0, 0)`
    }

    function setShownFractionRest() {
      setShownFraction(restFraction.value)
    }
  },
})
</script>

<style scoped>
li {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
