<template>
  <PerspectiveProvider :perspective="perspective">
    <component :is="component" :modifier="modifier" :sizes="sizes" :gap="gap">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="min-content preserve-3d"
      >
        <PerspectiveBox :gap="-(gap * index)">
          <slot :item="item" :index="index"></slot>
        </PerspectiveBox>
      </div>
    </component>
  </PerspectiveProvider>
</template>

<script>
/**
 * <MultiLevel
      disposition="circular:clockwise-5000"
      :items="items"
      :gap="gap"
      :perspective="perspective"
      :sizes="380"
    >
      <template #default="slotProps">
        <div v-center class="box">
          <!-- {{ slotProps.item.name }} -->
          <img :src="slotProps.item.name" />
        </div>
      </template>
    </MultiLevel>
 */
import { defineComponent } from 'vue'
import PerspectiveBox from '../PerspectiveBox.vue'
import PerspectiveProvider from '../PerspectiveProvider.vue'
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
    PerspectiveBox,
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
