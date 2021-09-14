<template>
  <!-- <div v-if="levels">
      <slot v-for="level in levels" :name="level">
        <slot></slot>
      </slot>
    </div> -->
  <div v-if="items">
    <component :is="disposition.component" :direction="disposition.direction">
      <div class="item" v-for="(item, index) in items" :key="index">
        <PerspectiveBox :gap="gap * index">
          <slot :item="item" :index="index"></slot>
        </PerspectiveBox>
      </div>
    </component>
  </div>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import PerspectiveBox from './PerspectiveBox.vue'
import LinearDisposition from './LinearDisposition.vue'

export default defineComponent({
  name: 'multi-level',
  props: ['levels', 'items', 'gap'],
  components: { PerspectiveBox, LinearDisposition },
  setup(props, context) {
    const gap = toRef(props, 'gap')

    const disposition = getDispositionComponent()

    return {
      gap,
      disposition,
    }

    function getDispositionComponent() {
      const [type, direction] = context.attrs.disposition.split(':')
      let component

      switch (type) {
        case 'linear':
        default:
          component = LinearDisposition
          break
      }

      return { component, direction }
    }

    // const { levels, items } = toRefs(props)
    // if (levels.value && items.value) throw new Error('no levels e items')
  },
})

/**
 * <MultiLevel :levels="5">
      <div>default</div>

      <template #2>
        <div>
          second
        </div>
      </template>
      <template #3>
        <div>
          third
        </div>
      </template>
    </MultiLevel>

    *********************+

    <MultiLevel :items="refItems">
      <template #default="slotProps">
        <div>
          {{ slotProps.item.name }}
        </div>
      </template>
    </MultiLevel>

    const items = [1, 2, 3].map(index => ({
      name: 'test' + index,
    }))

    const refItems = ref(items)
 */
</script>

<style scoped>
.background {
  position: relative;
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
