<template>
  <PerspectiveProvider :perspective="800">
    <component
      :is="detector"
      :width="width"
      :height="height"
      :disableTimeout="animationDurationMs"
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
    </component>
  </PerspectiveProvider>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, inject } from 'vue'

import MouseVectorDetector from './detectors/MouseVectorDetector.vue'
import TouchVectorDetector from './detectors/TouchVectorDetector.vue'

export default defineComponent({
  name: 'two-faces',
  props: {
    animationDurationMs: {
      type: Number,
      default: 1000,
    },
  },
  setup(props) {
    const el = ref(null)
    const width = ref(null)
    const height = ref(null)
    const { animationDurationMs } = toRefs(props)

    const handleVector = makeHandleVector()

    const isTouch = inject('isTouch')
    const detector = isTouch ? TouchVectorDetector : MouseVectorDetector

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

    return {
      el,
      width,
      height,
      handleVector,
      animationDurationMs,
      detector,
    }

    function makeHandleVector() {
      const options = {
        easing: 'cubic-bezier(.48,.97,.72,.28)',
        fill: 'forwards',
      }

      const r = {
        X: 0,
        Y: 0,
        Z: 0,
      }
      let factor = 1

      return function handleVector({ x, y, i, aRad, dir }) {
        options.duration = animationDurationMs.value

        let deltaXa = 0,
          deltaYa = 0,
          deltaXb = 0,
          deltaYb = 0

        let isVertical = false

        switch (dir) {
          case 'up':
            deltaXa = -160
            deltaXb = -20
            isVertical = true
            break
          case 'right':
            deltaYa = -160
            deltaYb = -20
            break
          case 'down':
            deltaXa = 160
            deltaXb = 20
            isVertical = true
            break
          case 'left':
            deltaYa = 160
            deltaYb = 20
            break
        }

        const frames = [
          {
            transform: `
            rotateX(${r.X}deg)
            rotateY(${r.Y}deg)
            rotateZ(${r.Z}deg)
            translateX(0)
            translateY(0)`,
          },
          {
            transform: `
                rotateX(${(r.X += deltaXa)}deg)
                rotateY(${(r.Y += deltaYa)}deg)
                rotateZ(${r.Z}deg)
                translateX(${(x / 2) * factor}px)
                translateY(${(-y / 2) * factor}px)
                translateZ(30px)
                `,
          },
          {
            transform: `
              rotateX(${(r.X += deltaXb)}deg)
              rotateY(${(r.Y += deltaYb)}deg)
              rotateZ(${r.Z}deg)
              translateX(0)
              translateY(0)`,
          },
        ]
        if (isVertical)
          frames.push({
            transform: `
            rotateX(${r.X}deg)
            rotateY(${r.Y}deg)
            rotateZ(${(r.Z += 180)}deg)
            `,
          })

        el.value.animate(frames, options)
        factor *= -1
      }
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
