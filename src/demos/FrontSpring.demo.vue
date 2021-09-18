<template>
  <div class="relative background" v-center>
    <img src="@/assets/FrontSpring.png" class="image absolute" />
    <div class="absolute">
      <FrontSpring :items="items" :gap="200">
        <template #default="slotProps">
          <div v-center>
            <img :src="slotProps.item.src" />
          </div>
        </template>
      </FrontSpring>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject } from 'vue'

export default defineComponent({
  name: 'front-spring-demo',
  setup() {
    const minWindowSize = inject('windowSizes').min.value
    const picSize = Math.round(minWindowSize / 6)

    const items = ref(
      Array.from(Array(6).keys()).map(index => ({
        src: `https://picsum.photos/seed/${index}/${picSize}`,
      }))
    )

    return {
      items,
    }
  },
})
</script>

<style scoped>
.background {
  background: rgb(0, 212, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 212, 255, 1) 30%,
    rgba(9, 15, 121, 1) 97%,
    rgba(0, 15, 36, 1) 100%
  );
}

.relative {
  position: relative;
  height: 100vh;
}

.absolute {
  position: absolute;
}

.image {
  width: 70%;
  border-radius: 20px;
}
</style>
