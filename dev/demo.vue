<template>
  <WindowSizesProvider>
    <div class="blue">
      <FrontSpringDemo />
    </div>
    <div class="green">
      <TwoFacesDemo />
    </div>
  </WindowSizesProvider>
</template>

<script>
import { defineComponent } from 'vue'
import FrontSpringDemo from './demos/FrontSpring.demo.vue'
import TwoFacesDemo from './demos/TwoFaces.demo.vue'

export default defineComponent({
  name: 'demo',
  components: { FrontSpringDemo, TwoFacesDemo },
})
</script>

<style scoped>
.green {
  background: rgb(47, 121, 9);
  background: linear-gradient(
    90deg,
    rgba(47, 121, 9, 1) 0%,
    rgba(9, 121, 11, 1) 19%,
    rgba(0, 255, 38, 1) 100%
  );
}
</style>
