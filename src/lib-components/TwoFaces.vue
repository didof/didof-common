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
        easing: 'cubic-bezier(.48,.97,.72,.28)',
        fill: 'forwards',
      }

      const r = {
        X: 0,
        Y: 0,
      }
      let factor = 1

      return function handleVector({ x, y, i, aRad, dir }) {
        let deltaXa = 0,
          deltaYa = 0,
          deltaXb = 0,
          deltaYb = 0

        switch (dir) {
          case 'up':
            deltaXa = -160
            deltaXb = -20
            break
          case 'right':
            deltaYa = -160
            deltaYb = -20
            break
          case 'down':
            deltaXa = 160
            deltaXb = 20
            break
          case 'left':
            deltaYa = 160
            deltaYb = 20
            break
        }

        el.value.animate(
          [
            {
              transform: `rotateX(${r.X}deg) rotateY(${r.Y}deg) translateX(0) translateY(0)`,
            },
            {
              transform: `
                rotateX(${(r.X += deltaXa)}deg)
                rotateY(${(r.Y += deltaYa)}deg)
                translateX(${(x / 2) * factor}px)
                translateY(${(-y / 2) * factor}px)
                translateZ(30px)`,
            },
            {
              transform: `rotateX(${(r.X += deltaXb)}deg) rotateY(${(r.Y += deltaYb)}deg) translateX(0) translateY(0)`,
            },
          ],
          animationConf
        )

        factor *= -1
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
