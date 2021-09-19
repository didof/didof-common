<template>
  <div id="app">
    <!-- <WindowSizesProvider>
      <DeviceProvider>
        <FrontSpringDemo />
        <TwoFacesDemo />
      </DeviceProvider>
    </WindowSizesProvider> -->
    <AristidebenoistDemo />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

import FrontSpringDemo from '@/demos/FrontSpring.demo.vue'
import TwoFacesDemo from '@/demos/TwoFaces.demo.vue'
import AristidebenoistDemo from '@/demos/Aristidebenoist.demo.vue'

export default defineComponent({
  name: 'serve',
  components: {
    FrontSpringDemo,
    TwoFacesDemo,
    AristidebenoistDemo,
  },
  setup() {
    const items = ref(
      Array.from(Array(1).keys()).map(int => ({
        key: 'ciao-' + int,
        src: '@/assets/TwoFaces.png',
        color: 'blue',
      }))
    )

    return { items }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100vw;
  height: 100%;
}
</style>
