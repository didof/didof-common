<template>
  <div ref="el">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'circular-disposition',
  props: {
    modifier: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const { modifier } = toRefs(props)

    function getT(modifier) {
      const time = ref(1)
      let timeTick

      switch (modifier.value) {
        case 'clockwise':
          timeTick = function() {
            time.value += 0.01
          }
          break
        case 'anticlockwise':
          timeTick = function() {
            time.value -= 0.01
          }
          break
        default:
          timeTick = function() {}
      }

      return [time, timeTick]
    }

    const [time, timeTick] = getT(modifier)

    const circle = {
      width: 500,
      height: 500,
      radius: 250,
      center: {
        x: 250,
        y: 250,
      },
    }

    /**
     * Può aver senso mettere le posizioni in un reactive?
     * Come gestisco che si riaggiornino da sole quando cambiano?
     */

    const el = ref(null)
    let children
    const baseAngle = calculateBaseAngle(
      context.slots.default()[0].children.length
    )

    onMounted(() => {
      children = retrieveChildren(el.value.childNodes)
      paintChildren(children)
    })

    setInterval(() => {
      timeTick()
      paintChildren(children)
    }, 100)

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

    return {
      el,
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
