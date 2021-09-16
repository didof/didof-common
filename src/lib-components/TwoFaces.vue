<template>
  <div class="scene" ref="el" v-dynamicEvents="events">
    <div class="card">
      <div class="face face--front" v-center>
        <slot name="front"></slot>
      </div>
      <div class="face face--back" v-center>
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  <!-- <TwoFaces :width="100" :height="100" :rotate-on="['click']">
      <template #front>
        <div>
          ciao
        </div>
      </template>
      <template #back>
        <div>
          addio
        </div>
      </template>
    </TwoFaces> -->
 */
import { defineComponent, ref, toRefs, onMounted } from 'vue'

export default defineComponent({
  name: 'two-faces',
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    rotateOn: {
      type: Array,
      default: ['click'],
    },
  },
  setup(props) {
    const el = ref(null)
    const { width, height, rotateOn } = toRefs(props)

    onMounted(() => {
      el.value.style.width = width.value + 'px'
      el.value.style.height = height.value + 'px'
    })

    return {
      el,
      events: rotateOn,
    }
  },
})
</script>

<style scoped>
.scene {
  perspective: 600px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.face--front {
  background: red;
}

.face--back {
  background: blue;
  transform: rotateY(180deg);
}
</style>
