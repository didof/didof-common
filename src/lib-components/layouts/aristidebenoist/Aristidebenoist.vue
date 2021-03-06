<template>
  <div ref="wrapper" class="aristidebenoist">
    <nav class="row">
      <div class="padding">
        <slot name="top-left"></slot>
      </div>
      <div class="padding">
        <slot name="top-right"></slot>
      </div>
    </nav>

    <main>
      <MouseWheelDetector :itemsAmount="items.length" @wheel="handleWheel">
        <ul ref="list">
          <li v-for="(item, index) in items" :key="item.key">
            <MaskImage
              :src="item.src"
              :width="itemsWidth"
              :height="itemsHeight"
              :restFraction="restFraction"
              :transitionDuration="transitionDuration"
              :ref="setImageRef"
              @selected="handleSelect(index)"
              @blur="handleBlur(index)"
            />
          </li>
        </ul>
      </MouseWheelDetector>
    </main>

    <footer class="row">
      <div class="padding">
        <slot name="bottom-left"></slot>
      </div>
      <div class="padding">
        <slot name="bottom-right"></slot>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs, onMounted } from 'vue'
import { useDebounce } from '@/utils/debounce'
import makeRefList from '@/utils/refList'

export default defineComponent({
  name: 'aristidebenoist',
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsWidth: {
      type: Number,
      default: 300,
    },
    itemsHeight: {
      type: Number,
      default: 200,
    },
    gap: {
      type: Number,
      default: 15,
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
      gap,
      restFraction,
      transitionDuration,
      defaultBackgroundColor,
    } = toRefs(props)

    const list = ref(null)
    const wrapper = ref(null)

    const images = makeRefList()

    let layouter = null
    let selected = null

    onMounted(() => {
      list.value.style.height = itemsHeight.value + 'px'

      const children = gatherChildren()

      children.forEach(child => {
        child.style.transitionDuration = transitionDuration.value + 'ms'
      })

      layouter = Layouter(children)
      layouter.rest()

      // wrapper
      wrapper.value.style.transitionDuration = transitionDuration.value + 'ms'
      wrapper.value.style.backgroundColor = defaultBackgroundColor.value

      function gatherChildren() {
        return Array.from(list.value.childNodes).filter(
          child => child.nodeName === 'LI'
        )
      }
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
      handleWheel,
      setImageRef: images.push,
    }

    function handleWheel(position) {
      if (selected != null) {
        images.refs[selected].forceClose()
        layouter.rest()
      }
      layouter.slideList(position)
    }

    function handleSelect(index) {
      selected = index
      layouter.select(index)
      layouter.updateBackgroundColor(index)
      layouter.slideList(index)
    }

    function handleBlur(index) {
      if (index === selected) {
        layouter.rest()
        selected = null
      }
    }

    function Layouter(children) {
      return {
        rest,
        select: useDebounce(select),
        updateBackgroundColor,
        slideList,
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

      function updateBackgroundColor(index) {
        const { backgroundColor } = items.value[index]
        if (backgroundColor)
          wrapper.value.style.backgroundColor = backgroundColor
      }

      function slideList(index) {
        const closedWidth = itemsWidth.value * restFraction.value + gap.value

        // TODO use injected windowSizes
        const listOffset =
          closedWidth * index - (window.innerWidth - itemsWidth.value) / 2

        list.value.animate([{ transform: `translateX(${-listOffset}px)` }], {
          duration: transitionDuration.value,
          easing: 'ease-in-out',
          fill: 'forwards',
        })
      }

      function calcBaseOffset(index) {
        const fraction = itemsWidth.value * restFraction.value

        return fraction * index + gap.value * index
      }

      function setOffset(child, offset) {
        child.style.transform = `translateX(${offset}px)`
      }
    }
  },
})

/**
 * TODO
 * default itemsWidth, itemsHeight , gap.value.value based on windowSizes
 *
 * TODO
 * activate decoration slots only if passed
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

nav {
  position: absolute;
  top: 0;
}

footer {
  position: absolute;
  bottom: 0;
}

.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.padding {
  padding: 20px;
}
</style>
