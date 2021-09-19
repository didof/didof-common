<template>
  <div ref="wrapper" class="aristidebenoist">
    <main>
      <ul ref="list">
        <li v-for="(item, index) in items" :key="item.key">
          <MaskImage
            :src="item.src"
            :width="itemsWidth"
            :height="itemsHeight"
            :restFraction="restFraction"
            :transitionDuration="transitionDuration"
            @selected="handleSelect(index)"
            @blur="handleBlur(index)"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted, onBeforeUnmount } from 'vue'
import { useDebounce } from '@/utils/debounce'
import useRenderer from '@/utils/Renderer'

export default defineComponent({
  name: 'aristidebenoist',
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsWidth: {
      type: Number,
      default: 500,
    },
    itemsHeight: {
      type: Number,
      default: 300,
    },
    restFraction: {
      type: Number,
      default: 0.2,
    },
    transitionDuration: {
      type: Number,
      default: 750,
    },
    defaultBackgroundColor: {
      type: String,
      default: 'aliceblue',
    },
  },
  setup(props) {
    const {
      items,
      itemsWidth,
      itemsHeight,
      restFraction,
      transitionDuration,
      defaultBackgroundColor,
    } = toRefs(props)

    const list = ref(null)
    const wrapper = ref(null)
    const gap = 40

    let children, layouter, mouseWheelDetector

    let selected = null

    onMounted(() => {
      list.value.style.height = itemsHeight.value + 'px'

      children = gatherChildren()

      children.forEach(child => {
        child.style.transitionDuration = transitionDuration.value + 'ms'
      })

      layouter = Layouter(children)
      layouter.rest()

      // wrapper
      wrapper.value.style.transitionDuration = transitionDuration.value + 'ms'
      wrapper.value.style.backgroundColor = defaultBackgroundColor.value

      mouseWheelDetector = makeMouseWheelDetector(list)
      mouseWheelDetector.register()

      function gatherChildren() {
        return Array.from(list.value.childNodes).filter(
          child => child.nodeName === 'LI'
        )
      }
    })

    onBeforeUnmount(() => {
      mouseWheelDetector.unregister()
    })

    return {
      list,
      wrapper,
      items,
      itemsWidth,
      itemsHeight,
      restFraction,
      transitionDuration,
      handleSelect,
      handleBlur,
    }

    function handleSelect(index) {
      selected = index
      layouter.select(index)
    }

    function handleBlur(index) {
      if (index === selected) layouter.rest()
    }

    function Layouter(children) {
      return {
        rest,
        select: useDebounce(select),
      }

      function calcBaseOffset(index) {
        return itemsWidth.value * restFraction.value * index + gap * index
      }

      function setOffset(child, offset) {
        child.style.transform = `translateX(${offset}px)`
      }

      function select(selectedIndex) {
        // positions
        children.forEach((child, index) => {
          if (index < selectedIndex) {
            const offset = calcBaseOffset(index) - itemsWidth.value / 2
            setOffset(child, offset)
            return
          }

          if (index === selectedIndex) {
            const offset = calcBaseOffset(index)
            setOffset(child, offset)
            return
          }

          const offset = calcBaseOffset(index) + itemsWidth.value / 2
          setOffset(child, offset)
        })

        // wrapper
        const { backgroundColor } = items.value[selectedIndex]
        if (backgroundColor)
          wrapper.value.style.backgroundColor = backgroundColor
      }

      function rest() {
        // positions
        children.forEach((child, index) => {
          const offset = calcBaseOffset(index)
          setOffset(child, offset)
        })

        // wrapper
        wrapper.value.style.backgroundColor = defaultBackgroundColor.value
      }
    }
  },
})

const defaultConfig = {
  increment: 10,
  maxVelocity: 30,
}

function makeMouseWheelDetector(el, config = defaultConfig) {
  config = Object.assign(config, defaultConfig)

  let acceleration = 0
  let offset = 0

  const Renderer = useRenderer(et => {
    const inverse = Math.sign(acceleration) * -1
    if (acceleration !== 0) acceleration += inverse

    offset += acceleration * et * 3
    el.value.style.transform = `translateX(${offset}px)`
  })

  return {
    register() {
      window.addEventListener('wheel', handleMouseWheel)
      Renderer.start()
    },
    unregister() {
      window.removeEventListener('wheel', handleMouseWheel)
      Renderer.stop()
    },
  }

  function handleMouseWheel({ wheelDelta }) {
    // -1 right, +1 left
    const sign = Math.sign(wheelDelta)

    let delta = config.increment * sign
    if (
      acceleration < -config.maxVelocity ||
      acceleration > +config.maxVelocity
    )
      return
    acceleration += delta
  }
}

/**
 * TODO
 * make it responsive to array methods
 *
 * allow to use both image and video
 */
</script>

<style scoped>
.aristidebenoist {
  width: 100vw;
  height: 100vh;

  position: relative;
  overflow: hidden;

  transition-property: background-color;
}

main {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;

  transition-property: transform;
}

li {
  display: inline-block;
  max-width: 0px;
  position: absolute;
}
</style>
