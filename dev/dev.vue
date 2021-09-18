<template>
  <div>
    Place here any component
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import registerAllComponents from '@/utils/register'

export default defineComponent({
  name: 'dev',
  components: registerAllComponents(),
  setup() {},
})
</script>
