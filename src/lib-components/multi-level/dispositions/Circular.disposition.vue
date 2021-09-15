<template>
  <InteserctionObserver
    v-if="useIntersectionObserver"
    :threshold="threshold"
    @in="inView"
    @out="outView"
  >
    <div ref="el">
      <slot></slot>
    </div>
  </InteserctionObserver>
  <div v-else ref="el">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'
import InteserctionObserver from '../../IntersectionObserver.vue'
import useRenderer from './Renderer'

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
    const [rotation, msToRevolution] = readModifier(props)

    function readModifier(props) {
      const { modifier } = toRefs(props)
      let [rotation, msToRevolution] = modifier.value.split('-')

      if (rotation !== 'clockwise' && rotation !== 'anticlockwise')
        rotation = false

      if (!msToRevolution && typeof msToRevolution !== 'number')
        msToRevolution = 1000
      msToRevolution = parseInt(msToRevolution)

      return [rotation, msToRevolution]
    }

    const radius = 200
    const el = ref(null)
    const threshold = ref([1])
    const baseAngle = (Math.PI * 2) / context.slots.default()[0].children.length

    let children
    let paint

    const renderer = useRenderer(et => {
      paint(et)
    })

    onMounted(() => {
      children = initChildren(el.value.childNodes)
      paint = initPainter(children, {
        rotation,
      })
      paint()
    })

    onBeforeUnmount(() => {
      timer.stop()
    })

    return {
      el,
      threshold,
      useIntersectionObserver: Boolean(rotation),
      inView,
      outView,
    }

    function initChildren(childNodes) {
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
          sizes: {
            width: child.clientWidth,
            height: child.clientHeight,
          },
        }
      }
    }

    function initPainter(children, { rotation }) {
      const isClockwise = rotation === 'clockwise'
      const stepsToRevolution = Math.round(
        msToRevolution / renderer.frameDuration
      )
      const angleIncrement = (Math.PI * 2) / stepsToRevolution

      return function paint(et = 0) {
        children.forEach(child => {
          const { width, height } = child.sizes

          if (isClockwise) child.angle += et * angleIncrement
          else child.angle -= et * angleIncrement

          const x = radius + Math.cos(child.angle) * radius - width / 2
          const y = radius + Math.sin(child.angle) * radius - height / 2

          child.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
      }
    }

    function inView() {
      renderer.start()
    }

    function outView() {
      renderer.stop()
    }
  },
})
</script>

<style scoped>
div {
  position: relative;
  width: 400px;
  height: 400px;
  border: dashed 1px;
  border-radius: 50%;
}
</style>
