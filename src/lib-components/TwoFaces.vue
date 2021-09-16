<template>
  <PerspectiveProvider :perspective="800">
    <div class="card" ref="el">
      <div class="face face--front">
        <slot name="front"></slot>
      </div>
      <div class="face face--back">
        <slot name="back"></slot>
      </div>
    </div>
  </PerspectiveProvider>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue'

import { PerspectiveProvider } from '@/lib-components'

export default defineComponent({
  name: 'two-faces',
  components: { PerspectiveProvider },
  props: {
    rotateOn: {
      type: Array,
      default: ['click'],
    },
  },
  setup(props) {
    const el = ref(null)
    const { rotateOn } = toRefs(props)

    onMounted(() => {
      const [front, back] = Array.from(el.value.childNodes)
        .map(child => child.childNodes)
        .map(child => Array.from(child))
        .map(face => face.find(child => child.nodeName === 'DIV'))

      const width = Math.max(front.clientWidth, back.clientWidth)
      const height = Math.max(front.clientHeight, back.clientHeight)

      front.style.width = width + 'px'
      front.style.height = height + 'px'
      back.style.width = width + 'px'
      back.style.height = height + 'px'
    })

    return {
      el,
      events: rotateOn,
    }
  },
})
</script>

<style scoped>
.card {
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  backface-visibility: hidden;
}

.face--front {
  transform: rotateY(0);
}

.face--back {
  transform: rotateY(180deg);
}
</style>
