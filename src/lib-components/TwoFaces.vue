<template>
  <PerspectiveProvider :perspective="800">
    <div ref="el" class="card">
      <MouseVectorDetector
        :width="width"
        :height="height"
        :disableTimeout="300"
        @vector="handleVector"
      >
        <div class="face face--front">
          <slot name="front"></slot>
        </div>
        <div class="face face--back">
          <slot name="back"></slot>
        </div>
      </MouseVectorDetector>
    </div>
  </PerspectiveProvider>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue'

import { PerspectiveProvider, MouseVectorDetector } from '@/lib-components'

export default defineComponent({
  name: 'two-faces',
  components: { PerspectiveProvider, MouseVectorDetector },
  setup(props) {
    const el = ref(null)
    const width = ref(null)
    const height = ref(null)

    onMounted(() => {
      const mouseVectorDetectorElement = el.value.childNodes[0]

      const faces = Array.from(mouseVectorDetectorElement.childNodes).filter(
        child => child.nodeName === 'DIV'
      )
      const [front, back] = faces

      width.value = Math.max(front.clientWidth, back.clientWidth)
      height.value = Math.max(front.clientHeight, back.clientHeight)

      const [frontContent, backContent] = Array.from(faces).map(
        face =>
          Array.from(face.childNodes).filter(
            child => child.nodeName === 'DIV'
          )[0]
      )

      frontContent.style.width = width.value + 'px'
      frontContent.style.height = height.value + 'px'
      backContent.style.width = width.value + 'px'
      backContent.style.height = height.value + 'px'
    })

    function handleVector({ angle, x, y, i }) {
      // TODO rotate card
      console.log(angle, x, y, i)
    }

    return {
      el,
      width,
      height,
      handleVector,
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
