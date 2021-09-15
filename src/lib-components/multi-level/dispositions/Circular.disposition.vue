<template>
  <InteserctionObserver
    v-if="useIntersectionObserver"
    :threshold="threshold"
    @in="inView"
    @out="outView"
  >
    <div ref="el" class="circle">
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
    perspective: {
      type: Number,
      required: true,
    },
    sizes: {
      type: Number,
      default: null,
    },
    gap: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const { perspective, sizes: radius, gap } = toRefs(props)
    const [rotation, msToRevolution] = readModifier(props)

    // TODO is readonly. Can the provider/injector pattern solve this?
    if (radius.value === null)
      radius.value = Math.min(window.innerWidth, window.innerHeight)

    const el = ref(null)
    const threshold = ref([1])

    let children
    let paint

    const renderer = useRenderer(et => {
      paint(et)
    })

    onMounted(() => {
      el.value.style.width = radius.value * 2 + 'px'
      el.value.style.height = radius.value * 2 + 'px'
      children = initChildren(el.value.childNodes)
      paint = initPainter(children, {
        rotation,
      })
      paint()
    })

    onBeforeUnmount(() => {
      renderer.stop()
    })

    return {
      el,
      threshold,
      useIntersectionObserver: Boolean(rotation),
      inView,
      outView,
    }

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

    function initChildren(childNodes) {
      return Array.from(childNodes)
        .filter(inDIVElements)
        .map(initChild)

      function inDIVElements(child) {
        return child.nodeName === 'DIV'
      }

      function initChild(child, index) {
        const baseAngle =
          (Math.PI * 2) / context.slots.default()[0].children.length

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
        children.forEach((child, index) => {
          const { width, height } = child.sizes

          if (isClockwise) child.angle += et * angleIncrement
          else child.angle -= et * angleIncrement

          const cos = Math.cos(child.angle) * radius.value
          const sin = Math.sin(child.angle) * radius.value

          const x = radius.value + cos - width / 2
          const y = radius.value + sin - height / 2

          const distance = perspective.value + gap.value * index

          const a = Math.atan(sin / distance) * (perspective.value / 10)
          const b = -Math.atan(cos / distance) * (perspective.value / 10)

          child.style.transform = `translateX(${x}px) translateY(${y}px) rotateX(${a}deg) rotateY(${b}deg)`
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
.circle {
  position: relative;
  border-radius: 50%;
  perspective: 1000px;
}
</style>
