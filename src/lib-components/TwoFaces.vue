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
  setup() {
    const el = ref(null)
    const width = ref(null)
    const height = ref(null)
    let isFacingFront = true

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

    function handleVector({ angle, x, y, i, q }) {
      const animationConf = {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards',
      }

      let r1 = 160
      let r2 = 180
      let factor = isFacingFront ? -1 : 1
      if (q === 1 || q === 4) (r1 *= factor), (r2 *= factor)
      isFacingFront ? frontToBack() : backToFront()
      isFacingFront = !isFacingFront

      function frontToBack() {
        el.value.animate(
          [
            {
              transform: `translateX(0) translateY(0) rotateY(0deg)`,
            },
            {
              transform: `translateX(${x / 2}px) translateY(${y /
                2}px) rotateY(${r1}deg) translateZ(-70px)`,
            },
            {
              transform: `translateX(0) translateY(0) rotateY(-180deg)`,
            },
          ],
          animationConf
        )
      }

      // TODO fix with quadrants
      function backToFront() {
        el.value.animate(
          [
            {
              transform: `translateX(0) translateY(0) rotateY(-180deg)`,
            },
            {
              transform: `translateX(${-x / 2}px) translateY(${-y /
                2}px) rotateY(${-r1}deg) scale(2.1)`,
            },
            {
              transform: `translateX(0) translateY(0) rotateY(0deg)`,
            },
          ],
          animationConf
        )
      }

      // TODO when it rotates, it see backwards the movement; invert quadrants
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
