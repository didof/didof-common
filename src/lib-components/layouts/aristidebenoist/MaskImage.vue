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
import { defineComponent, ref, toRef, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'mask-div',
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

    const defaultGrayScale = 75

    // getters
    const grayScale = context.attrs.grayscale || defaultGrayScale

    onMounted(() => {
      mask.value.style.width = width.value + 'px'
      mask.value.style.height = height.value + 'px'

      setShownFractionRest()
      setGrayScaleRest()

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
        // context.emit('click')
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
      img.value.style.cursor = 'default'
      isOpen = false
      context.emit('blur')
    }

    function handleMouseOver() {
      if (isOpen) return
      setShownFraction(restFraction.value + 0.1)
      setGrayScale(grayScale - 25)
      img.value.style.cursor = 'pointer'
      context.emit('mouseover')
    }

    function handleMouseLeave() {
      if (isOpen) return
      setShownFractionRest()
      setGrayScaleRest()
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
    function setGrayScale(percent) {
      img.value.style.filter = `grayscale(${percent}%)`
    }

    function setGrayScaleRest() {
      setGrayScale(grayScale)
    }
  },
})
</script>

<style scoped>
div {
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
