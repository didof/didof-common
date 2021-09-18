<template>
  <div>
    <div class="row blue">
      <FrontSpringDemo />
      <img src="@/assets/img/FrontSpring.png" class="image" />
    </div>
    <div class="row green">
      <img src="@/assets/img/TwoFaces.png" class="image" />
      <TwoFacesDemo />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import FrontSpringDemo from './demos/FrontSpring.demo.vue'
import TwoFacesDemo from './demos/TwoFaces.demo.vue'

export default defineComponent({
  name: 'demo',
  components: { FrontSpringDemo, TwoFacesDemo },
})
</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10% 0;
}

.row.blue {
  background: rgb(0, 212, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 212, 255, 1) 30%,
    rgba(9, 15, 121, 1) 97%,
    rgba(0, 15, 36, 1) 100%
  );
}
.row.green {
  background: rgb(47, 121, 9);
  background: rgb(47, 121, 9);
  background: linear-gradient(
    90deg,
    rgba(47, 121, 9, 1) 0%,
    rgba(9, 121, 11, 1) 19%,
    rgba(0, 255, 38, 1) 100%
  );
}

.image {
  max-width: 40%;
}
</style>
