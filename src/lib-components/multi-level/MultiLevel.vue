<template>
  <div v-width>
    <div v-if="items">
      <component
        :is="component"
        :modifier="modifier"
        :perspective="perspective"
        :sizes="sizes"
        :gap="gap"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="min-content preserve-3d"
        >
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
    const [component, modifier] = readDisposition(context)
    const gap = toRef(props, 'gap')

    return {
      gap,
      component,
      modifier,
    }

    function readDisposition(context) {
      let [type, modifier] = context.attrs.disposition.split(':')
      if (!type) type = 'linear'

      const component = dispositions[type]

      return [component, modifier]
    }
  },
})
</script>

<style scoped>
.min-content {
  width: min-content;
  height: min-content;
}

.preserve-3d {
  transform-style: preserve-3d;
}
</style>
