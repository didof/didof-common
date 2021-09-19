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
import { defineComponent, ref, toRef, toRefs } from 'vue'

export default defineComponent({
  name: 'view-tmp',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  setup() {
    const el = ref(null)

    let isOpen = false

    return {
      el,
      handleClick,
      handleClickOutside,
      handleMouseOver,
      handleMouseLeave,
    }

    function handleClick() {
      isOpen = true
      changeSize(1)
    }

    function handleClickOutside() {
      isOpen = false
      changeSize(0.16)
    }

    function handleMouseOver() {
      if (isOpen) return
      changeSize(0.2)
    }

    function handleMouseLeave() {
      if (isOpen) return
      changeSize(0.16)
    }

    function changeSize(percent) {
      const width = el.value.getBoundingClientRect().width

      const pxToShow = width * percent

      const pxHider = (width - pxToShow) / 2

      el.value.style.borderLeft = `${pxHider}px solid rgba(0, 0, 0, 0)`
      el.value.style.borderRight = `${pxHider}px solid rgba(0, 0, 0, 0)`
    }
  },
})
</script>

<style scoped>
li {
  width: 600px;
  height: 350px;
  overflow: hidden;
  transition: 1s ease-in-out;

  position: relative;
  border-left: 250px solid rgba(255, 255, 255, 0);
  border-right: 250px solid rgba(255, 255, 255, 0);
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
