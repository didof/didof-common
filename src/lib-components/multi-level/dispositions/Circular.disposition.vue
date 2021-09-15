<template>
  <InteserctionObserver
    v-if="useIntersectionObserver"
    :threshold="threshold"
    @in="inView"
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
    const { modifier } = toRefs(props)

    // extract radius from modifiers circular:<radius>:clockwise-100
    //                                      :int     :sense    -intervalTime

    const radius = 250
    const el = ref(null)
    const threshold = ref([1])
    const baseAngle = (Math.PI * 2) / context.slots.default()[0].children.length
    const velocity = 1

    let children
    let paint

    const renderer = useRenderer(et => {
      paint(et)
    })

    onMounted(() => {
      children = initChildren(el.value.childNodes)
      paint = initPainter(children)
      paint()
    })

    onBeforeUnmount(() => {
      timer.stop()
    })

    return {
      el,
      threshold,
      useIntersectionObserver: modifier.value !== '',
      inView,
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

    function initPainter(children, isClockwise = true) {
      return function paint(et = 0) {
        children.forEach(child => {
          const { width, height } = child.sizes

          if (isClockwise) child.angle += et * velocity
          else child.angle -= et * velocity

          const x = radius + Math.cos(child.angle) * radius - width / 2
          const y = radius + Math.sin(child.angle) * radius - height / 2

          child.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
      }
    }

    function inView() {
      renderer.start()
    }

    // function outView() {
    //   timer.pause(() => paintChildren(children))
    // }
  },
})

//TODO call pause when change tab
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
