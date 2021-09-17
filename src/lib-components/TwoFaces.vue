<template>
  <PerspectiveProvider :perspective="800">
    <MouseVectorDetector
      :width="width"
      :height="height"
      :disableTimeout="300"
      @vector="handleVector"
    >
      <div ref="el" class="card">
        <div class="face face--front">
          <slot name="front"></slot>
        </div>
        <div class="face face--back">
          <slot name="back"></slot>
        </div>
      </div>
    </MouseVectorDetector>
  </PerspectiveProvider>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

import { PerspectiveProvider, MouseVectorDetector } from '@/lib-components'

export default defineComponent({
  name: 'two-faces',
  components: { PerspectiveProvider, MouseVectorDetector },
  setup() {
    const el = ref(null)
    const width = ref(null)
    const height = ref(null)

    const handleVector = makeHandleVector()

    onMounted(() => {
      const [frontChild, backChild] = Array.from(el.value.childNodes).map(
        child =>
          Array.from(child.childNodes).filter(
            child => child.nodeName === 'DIV'
          )[0]
      )

      width.value = Math.max(frontChild.clientWidth, backChild.clientWidth)
      height.value = Math.max(frontChild.clientHeight, backChild.clientHeight)
      el.value.style.width = width.value + 'px'
      el.value.style.height = height.value + 'px'

      frontChild.style.width = width.value + 'px'
      frontChild.style.height = height.value + 'px'
      backChild.style.width = width.value + 'px'
      backChild.style.height = height.value + 'px'
    })

    function makeHandleVector() {
      const animationConf = {
        duration: 1000,
        easing: 'ease-in-out',
        fill: 'forwards',
      }

      const r = {
        X: 0,
        Y: 0,
      }

      return function handleVector({ x, y, i, aRad, dir }) {
        let deltaX = 0,
          deltaY = 0

        switch (dir) {
          case 'up':
            deltaX = -180
            break
          case 'right':
            deltaY = -180
            break
          case 'down':
            deltaX = 180
            break
          case 'left':
            deltaY = 180
            break
        }

        el.value.animate(
          [
            { transform: `rotateX(${r.X}deg) rotateY(${r.Y}deg)` },
            {
              transform: `rotateX(${(r.X += deltaX)}deg) rotateY(${(r.Y += deltaY)}deg)`,
            },
          ],
          animationConf
        )
      }
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
  transform-origin: center;
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
