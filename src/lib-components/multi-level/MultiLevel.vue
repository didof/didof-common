<template>
  <div v-width class="d3">
    <!-- <div v-if="levels">
      <slot v-for="level in levels" :name="level">
        <slot></slot>
      </slot>
    </div> -->
    <div v-if="items">
      <component
        :is="component"
        :modifier="modifier"
        :perspective="perspective"
        :sizes="sizes"
      >
        <div v-for="(item, index) in items" :key="index" class="min-content">
          <PerspectiveBox :perspective="perspective" :gap="-(gap * index)">
            <slot :item="item" :index="index"></slot>
          </PerspectiveBox>
        </div>
      </component>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRef } from 'vue'
import PerspectiveBox from '../PerspectiveBox.vue'
import * as dispositions from './dispositions/index'
import { registerComponents } from '../../utils/register'

export default defineComponent({
  name: 'multi-level',
  props: ['levels', 'items', 'gap', 'perspective', 'sizes'],
  components: { PerspectiveBox, ...registerComponents(dispositions) },
  setup(props, context) {
    const { component, modifier } = getDispositionComponent()
    const gap = toRef(props, 'gap')

    return {
      gap,
      component,
      modifier,
    }

    function getDispositionComponent() {
      let [type, modifier] = context.attrs.disposition.split(':')
      if (!type) type = 'linear'

      const component = dispositions[type]

      return { component, modifier }
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
.min-content {
  width: min-content;
  height: min-content;
}

.d3 {
  transform-style: preserve-3d;
}
</style>
