<template>
  <article ref="el">
    <img
      :src="src"
      @click="handleClick"
      v-blur="handleBlur"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
    />
  </article>
</template>

<script>
import { defineComponent, ref, toRef, toRefs, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'view-tmp',
  emits: ['click', 'blur', 'mouseover', 'mouseleave'],
  props: {
    src: {
      type: String,
      required: true,
    },
    transitionDuration: {
      type: Number,
      default: 1000,
    },
    restFraction: {
      type: Number,
      default: 0.2,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    // init
    const defaultHeight = 350
    const defaultGrayScale = 75

    // getters
    const grayScale = context.attrs.grayscale || defaultGrayScale

    // refs & props
    const { transitionDuration, restFraction, width } = toRefs(props)
    const el = ref(null)

    // features
    let isOpen = false

    onMounted(() => {
      el.value.style.width = width.value + 'px'
      el.value.style.height = (context.attrs.height || defaultHeight) + 'px'

      setShownFractionRest()
      setGrayScaleRest()

      el.value.style.transition = `${transitionDuration.value}ms ease-in-out`
    })

    watch(transitionDuration, () => {
      el.value.style.transition = `${transitionDuration.value}ms ease-in-out`
    })

    return {
      el,
      handleClick,
      handleBlur,
      handleMouseOver,
      handleMouseLeave,
    }

    function handleClick() {
      if (isOpen) {
        context.emit('click')
      } else {
        isOpen = true
        setShownFraction(1)
        setGrayScale(0)
      }
    }

    function handleBlur() {
      if (!isOpen) return
      setShownFractionRest()
      setGrayScaleRest()
      el.value.style.cursor = 'default'
      isOpen = false
      context.emit('blur')
    }

    function handleMouseOver() {
      if (isOpen) return
      setShownFraction(restFraction.value + 0.1)
      setGrayScale(grayScale - 25)
      el.value.style.cursor = 'pointer'
      context.emit('mouseover')
    }

    function handleMouseLeave() {
      if (isOpen) return
      setShownFractionRest()
      setGrayScaleRest()
      el.value.style.cursor = 'default'
      context.emit('mouseleave')
    }

    // fraction
    function setShownFraction(fraction) {
      const pxToShow = width.value * fraction
      const pxHider = (width.value - pxToShow) / 2

      el.value.style.borderLeft = `${pxHider}px solid rgba(0, 0, 0, 0)`
      el.value.style.borderRight = `${pxHider}px solid rgba(0, 0, 0, 0)`
    }

    function setShownFractionRest() {
      setShownFraction(restFraction.value)
    }

    // grayscale
    function setGrayScale(percent) {
      el.value.style.filter = `grayscale(${percent}%)`
    }

    function setGrayScaleRest() {
      setGrayScale(grayScale)
    }
  },
})

/**
 * TODO
 * make it reactive to changes in width
 */
</script>

<style scoped>
article {
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
