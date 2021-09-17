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

      let r0 = 0
      let r1 = 180
      let invertDir = false

      return function handleVector({ x, y, i, aRad, dir }) {
        let rAxis, rSign

        switch (dir) {
          case 'up':
            rAxis = 'X'
            rSign = '-'
            break
          case 'right':
            rAxis = 'Y'
            rSign = '-'
            break
          case 'down':
            rAxis = 'X'
            rSign = '+'
            break
          case 'left':
            rAxis = 'Y'
            rSign = '+'
            break
        }

        console.log(`rotate${rAxis}(${rSign}${r1}deg)`)

        el.value.animate(
          [
            { transform: `rotate${rAxis}(${r0}deg)` },
            { transform: `rotate${rAxis}(${rSign}${r1}deg)` },
          ],
          animationConf
        )

        console.log(dir)

        invertDir = !invertDir

        const tmp = r0

        // r0 = Number(rSign + Math.abs(r1))

        // r1 = tmp
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
