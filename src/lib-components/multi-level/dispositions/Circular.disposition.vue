<template>
  <InteserctionObserver :threshold="threshold" @in="inView" @out="outView">
    <div ref="el">
      <slot></slot>
    </div>
  </InteserctionObserver>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'
import InteserctionObserver from '../../IntersectionObserver.vue'

export default defineComponent({
  name: 'circular-disposition',
  components: { InteserctionObserver },
  props: {
    modifier: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const { modifier } = toRefs(props)
    const [time, timer] = initTimer(modifier)

    // extract radius from modifiers circular:<radius>:clockwise-100
    //                                      :int     :sense    -intervalTime
    const circle = {
      width: 500,
      height: 500,
      radius: 250,
      center: {
        x: 250,
        y: 250,
      },
    }

    const el = ref(null)
    const threshold = ref([1])
    let children
    const baseAngle = calculateBaseAngle(
      context.slots.default()[0].children.length
    )

    onMounted(() => {
      children = retrieveChildren(el.value.childNodes)
      paintChildren(children)
    })

    onBeforeUnmount(() => {
      timer.stop()
    })

    return {
      el,
      threshold,
      inView,
      outView,
    }

    function retrieveChildren(childNodes) {
      return Array.from(childNodes)
        .filter(inDIVElements)
        .map(initChild)

      function inDIVElements(child) {
        return child.nodeName === 'DIV'
      }

      function initChild(child, index) {
        child.style.position = 'absolute'
        child.style.transition = '0.1s ease-in'

        return {
          angle: baseAngle * (index + 1),
          style: child.style,
          sizes: { w: child.clientWidth, h: child.clientHeight },
        }
      }
    }

    function paintChildren(children) {
      children.forEach(({ angle, style, sizes }) => {
        const x =
          circle.center.x +
          Math.cos(angle * time.value) * circle.radius -
          sizes.w / 2
        const y =
          circle.center.y +
          Math.sin(angle * time.value) * circle.radius -
          sizes.h / 2

        style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    }

    function calculateBaseAngle(childrenAmount) {
      return (Math.PI * 2) / childrenAmount
    }

    function initTimer(modifier) {
      const time = ref(1)
      let timeTick
      let interval
      let friction = 1

      switch (modifier.value) {
        case 'clockwise':
          timeTick = function() {
            time.value += 0.01 * friction
          }
          break
        case 'anticlockwise':
          timeTick = function() {
            time.value -= 0.01 * friction
          }
          break
        default:
          timeTick = function() {}
      }

      const timer = {
        start() {
          clearInterval(interval)
          friction = 1
          interval = setInterval(() => {
            timeTick()
            paintChildren(children)
          }, 100)
        },
        pause(painter) {
          clearInterval(interval)
          if (painter) animateWithFriction(painter)
        },
        stop() {
          clearInterval(interval)
        },
      }

      function animateWithFriction(painter) {
        repeat(10)

        function repeat(step) {
          setTimeout(() => {
            if (step === 0) {
              clearInterval(interval)
              return
            }

            friction -= 0.1
            timeTick()
            painter()
            repeat(--step)
          }, 100)
        }
      }

      return [time, timer]
    }

    function inView() {
      timer.start()
    }

    function outView() {
      timer.pause(() => paintChildren(children))
    }
  },
})
</script>

<style scoped>
div {
  position: relative;
  width: 500px;
  height: 500px;
  border: dashed 1px;
  border-radius: 50%;
}
</style>
