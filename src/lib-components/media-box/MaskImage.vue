<template>
  <div ref="mask">
    <img
      ref="img"
      :src="src"
      @click="handleClick"
      v-blur="handleBlur"
      @mouseover="handleMouseOver"
      @mouseleave="handleMouseLeave"
    />
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'mask-div',
  emits: ['click', 'selected', 'blur', 'mouseover', 'mouseleave'],
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    restFraction: {
      type: Number,
      default: 0.2,
    },
    transitionDuration: {
      type: Number,
      default: 1000,
    },
  },
  setup(props, context) {
    const { src, width, height, restFraction, transitionDuration } = toRefs(
      props
    )
    const img = ref(null)
    const mask = ref(null)

    let isOpen = false

    const grayScaleRest = context.attrs.grayscale || 90
    const brightnessSelected = context.attrs.brightness || 135

    onMounted(() => {
      mask.value.style.width = width.value + 'px'
      mask.value.style.height = height.value + 'px'

      setShownFractionRest()
      setFilters()

      mask.value.style.transition = `${transitionDuration.value}ms`
      img.value.style.transition = `${transitionDuration.value}ms`
    })

    return {
      img,
      mask,
      src,
      handleClick,
      handleBlur,
      handleMouseOver,
      handleMouseLeave,
    }

    function handleClick() {
      if (isOpen) {
        context.emit('click')
      } else {
        context.emit('selected')
        isOpen = true
        mask.value.style.transitionDelay = transitionDuration.value / 3 + 'ms'
        img.value.style.transitionDelay = transitionDuration.value / 3 + 'ms'
        mask.value.style.transitionTimingFunction = 'ease-in'
        img.value.style.transitionTimingFunction = 'ease-out'

        setShownFraction(1)
        setFilters(0, brightnessSelected)
      }
    }

    function handleBlur() {
      if (!isOpen) return
      mask.value.style.transitionDelay = '0ms'
      img.value.style.transitionDelay = '0ms'
      mask.value.style.transitionTimingFunction = 'ease-out'
      img.value.style.transitionTimingFunction = 'ease-in'

      setShownFractionRest()
      setFilters()
      img.value.style.cursor = 'default'
      isOpen = false
      context.emit('blur')
    }

    function handleMouseOver() {
      if (isOpen) return
      setShownFraction(restFraction.value + 0.05)
      setFilters(grayScaleRest - 25)
      img.value.style.cursor = 'pointer'
      context.emit('mouseover')
    }

    function handleMouseLeave() {
      if (isOpen) return
      setShownFractionRest()
      setFilters()
      img.value.style.cursor = 'default'
      context.emit('mouseleave')
    }

    // fraction
    function setShownFraction(fraction) {
      mask.value.style.transform = `scaleX(${fraction})`
      img.value.style.transform = `scaleX(${1 / fraction})`
    }

    function setShownFractionRest() {
      setShownFraction(restFraction.value)
    }

    // grayscale
    function setFilters(grayscale = grayScaleRest, brightness = 100) {
      img.value.style.filter = `grayscale(${grayscale}%) brightness(${brightness}%)`
    }
  },
})
</script>

<style scoped>
div {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  transition-property: scaleX, filter;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition-property: scaleX, filter;
}
</style>
