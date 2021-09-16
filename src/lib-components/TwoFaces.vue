<template>
  <PerspectiveProvider :perspective="800">
    <div
      draggable="false"
      class="card"
      ref="el"
      @mousedown="disableableInteractingUpdate(true)"
      @mouseup="disableableInteractingUpdate(false)"
      @mouseleave="disableableInteractingUpdate(false)"
      @mousemove="handleMousemove"
    >
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
  setup(props) {
    const el = ref(null)

    const interacting = ref(null)
    const disabled = ref(false)

    const handleMousemove = makeHandleMousemove()

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
      interacting,
      handleMousemove,
      disableableInteractingUpdate,
    }

    /**
     * when counter > 10 disable other listeners tmp, do the transition, reabilitate
     */

    function makeHandleMousemove(sensibility = 10) {
      let prevX,
        prevY = null
      let counter = 0
      let xAcc = 0
      let yAcc = 0

      return function handleMousemove(event) {
        if (!interacting.value) return
        if (counter > sensibility && !disabled.value) {
          disabled.value = true
          interacting.value = false

          console.log('x', xAcc / sensibility, 'y', yAcc / sensibility)

          /**
           * use xAcc and yAcc with sin e cos to recreate the angle of rotation
           *
           * // TODO
           * reset counter to zero if dragging is stopped before sensibility
           * reset counter if mouse goes outside card
           */

          console.log('animation start')
          setTimeout(() => {
            console.log('animation finish')
            disabled.value = false
          }, 1000)
          return
        }

        const { offsetX, offsetY } = event

        xAcc += offsetX - prevX || 0
        yAcc += offsetY - prevY || 0

        prevX = offsetX
        prevY = offsetY
        counter++
      }
    }

    function disableableInteractingUpdate(value) {
      if (disabled.value) return
      interacting.value = value
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
