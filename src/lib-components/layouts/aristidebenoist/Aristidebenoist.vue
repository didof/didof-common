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
import { defineComponent, ref, toRefs, onMounted } from 'vue'
import { useDebounce } from '@/utils/debounce'

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

    let children, layouter

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
}

li {
  display: inline-block;
  max-width: 0px;
  position: absolute;
}
</style>
