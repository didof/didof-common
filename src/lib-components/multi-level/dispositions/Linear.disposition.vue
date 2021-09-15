<template>
  <div :style="{ flexDirection }">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, ref, toRef } from 'vue'

export default defineComponent({
  name: 'linear-disposition',
  props: {
    modifier: {
      type: String,
      default: 'ltr',
    },
  },
  setup(props) {
    const modifier = toRef(props, 'modifier')

    const modifierMap = {
      ltr: 'row',
      rtl: 'row-reverse',
      ttb: 'column',
      btt: 'column-reverse',
    }

    const flexDirection = ref(modifierMap[modifier.value])

    return {
      flexDirection,
    }
  },
})
</script>

<style scoped>
div {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
</style>
