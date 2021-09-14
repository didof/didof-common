<script>
import { defineComponent } from 'vue'
import Demo from '../src/lib-components/demo.vue'

export default defineComponent({
  name: 'serve-dev',
  components: { Demo },
})
</script>

<template>
  <div id="app" v-center>
    <Demo />
  </div>
</template>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
