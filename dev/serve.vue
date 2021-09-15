<script>
import { defineComponent } from 'vue'
import Demo from '../src/lib-components/demo.vue'

export default defineComponent({
  name: 'serve-dev',
  components: { Demo },
})
</script>

<template>
  <div id="app" v-center v-height>
    <Demo />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
