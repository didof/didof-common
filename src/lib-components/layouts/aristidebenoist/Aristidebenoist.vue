<template>
  <div class="wrapper">
    <main>
      <ul ref="list">
        <li v-for="item in items" :key="item.key">
          <FractionImage
            :src="item.src"
            :width="itemsWidth"
            height="350"
            @click="handleFractionImageClick"
            :restFraction="0.2"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, toRefs, onMounted } from 'vue'
import FractionImage from './FractionImage.vue'
import useRenderer from '@/utils/Renderer'

export default defineComponent({
  name: 'aristidebenoist',
  components: { FractionImage },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsWidth: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    const { items, itemsWidth } = toRefs(props)

    const list = ref(null)

    const renderer = useRenderer(et => {
      console.log(et)
    })

    onMounted(() => {
      const children = gatherChildren()

      //   renderer.start()

      function gatherChildren() {
        return Array.from(list.value.childNodes).filter(
          child => child.nodeName === 'LI'
        )
      }
    })

    return {
      list,
      items,
      itemsWidth,
      handleFractionImageClick,
    }

    function handleFractionImageClick() {
      console.log('click')
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
.wrapper {
  width: 100vw;
  height: 100vh;
  background: grey;

  position: relative;
}

main {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}

ul {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
