<template>
  <WindowSizesProvider>
    <FrontSpringDemo />
    <TwoFacesDemo />
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

<style scoped></style>
