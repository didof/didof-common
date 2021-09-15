<template>
  <MultiLevel
    disposition="circular"
    :items="items"
    :gap="gap"
    :perspective="perspective"
  >
    <slot></slot>
  </MultiLevel>
</template>

<script>
import Vue from 'vue'
import MultiLevel from '../MultiLevel.vue'

export default Vue.extend({
  name: 'circular-multi-level',
  components: { MultiLevel },
  props: ['items', 'gap', 'perspective'],
})
</script>
