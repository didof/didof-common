<template>
  <div class="wrapper">
    <main>
      <ul ref="list">
        <li v-for="item in items" :key="item.key">
          <MaskImage
            :src="item.src"
            :width="itemsWidth"
            :height="300"
            :restFraction="restFraction"
          />
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, toRefs, onMounted } from 'vue'
import useRenderer from '@/utils/Renderer'
import MaskImage from './MaskImage.vue'

export default defineComponent({
  name: 'aristidebenoist',
  components: { MaskImage },
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsWidth: {
      type: Number,
      default: 500,
    },
    restFraction: {
      type: Number,
      default: 0.2,
    },
  },
  setup(props) {
    const { items, itemsWidth, restFraction } = toRefs(props)

    const list = ref(null)
    const gap = ref(10)

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
      restFraction,
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
}

li {
  display: inline-block;
  width: 100px;
}
</style>
