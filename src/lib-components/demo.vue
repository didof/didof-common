<template>
  <MultiLevel :items="items" :gap="gap" disposition="linear:ltr">
    <template #default="slotProps">
      <div v-box>
        {{ slotProps.item.name }}
      </div>
    </template>
  </MultiLevel>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import IntersectionObserver from './IntersectionObserver.vue'
import MultiLevel from './MultiLevel.vue'

export default defineComponent({
  name: 'demo',
  components: {
    // IntersectionObserver,
    MultiLevel,
  },
  setup() {
    const items = [1, 2, 3, 4, 5, 6].map(index => ({
      name: index,
    }))

    const refItems = ref(items)

    const refGap = ref(10)

    return {
      items: refItems,
      gap: refGap,
    }
  },
})
</script>

<style scoped>
#demo {
  height: 100vh;
}
</style>
