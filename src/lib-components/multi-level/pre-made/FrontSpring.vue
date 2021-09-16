<template>
  <MultiLevel
    disposition="circular:clockwise-10000"
    :items="items"
    :gap="gap"
    :perspective="perspective"
  >
    <template #default="slotProps">
      <slot :item="slotProps.item" :index="slotProps.index"></slot>
    </template>
  </MultiLevel>
</template>

<script>
/**
 * TODO
 * auto update when size changes
 */

import { defineComponent } from 'vue'
import MultiLevel from '../MultiLevel.vue'

export default defineComponent({
  name: 'circular-multi-level',
  components: { MultiLevel },
  props: {
    items: {
      type: Array,
      required: true,
    },
    gap: {
      type: Number,
      default: 200,
    },
    perspective: {
      type: Number,
      default: 800,
    },
  },
})
</script>
