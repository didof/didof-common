<template>
  <div class="wrapper">
    <main>
      <ul>
        <View
          v-for="item in items"
          :key="item.key"
          :src="item.src"
          width="500"
          height="350"
        />
      </ul>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, toRef, toRefs } from 'vue'
import View from './View.vue'

export default defineComponent({
  name: 'aristidebenoist',
  components: { View },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { items } = toRefs(props)

    return {
      items,
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
  width: 100%;
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
}
</style>
