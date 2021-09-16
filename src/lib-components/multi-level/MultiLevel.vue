<template>
  <PerspectiveProvider :perspective="perspective">
    <component :is="component" :modifier="modifier" :sizes="sizes" :gap="gap">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="min-content preserve-3d"
      >
        <ZBox :z="-(gap * index)">
          <slot :item="item" :index="index"></slot>
        </ZBox>
      </div>
    </component>
  </PerspectiveProvider>
</template>

<script>
import { defineComponent } from 'vue'
import ZBox from '../animated-box/ZBox.vue'
import PerspectiveProvider from '../providers/PerspectiveProvider.vue'
import * as dispositions from './dispositions/index'
import { registerComponents } from '../../utils/register'

export default defineComponent({
  name: 'multi-level',
  props: {
    items: {
      type: Array,
      required: true,
    },
    gap: {
      type: Number,
      required: true,
    },
    perspective: {
      type: Number,
      required: true,
    },
    sizes: {
      type: Number,
      required: false,
    },
  },
  components: {
    ZBox,
    PerspectiveProvider,
    ...registerComponents(dispositions),
  },
  setup(props, context) {
    const [component, modifier] = readDisposition(context)

    return {
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
