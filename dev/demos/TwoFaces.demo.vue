<template>
  <div class="layout green">
    <!-- <img src="@/assets/img/TwoFaces.png" class="image" /> -->
    <TwoFaces>
      <template #front>
        <div class="front" v-center>
          <img src="@/assets/img/neapulitan_card__retro.jpg" class="adapt" />
        </div>
      </template>
      <template #back>
        <div class="back" v-center>
          <img src="@/assets/img/neapulitan_card__front.jpg" class="adapt" />
        </div>
      </template>
    </TwoFaces>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'two-faces-demo',
})
</script>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.green {
  background: rgb(47, 121, 9);
  background: linear-gradient(
    90deg,
    rgba(47, 121, 9, 1) 0%,
    rgba(9, 121, 11, 1) 19%,
    rgba(0, 255, 38, 1) 100%
  );
}

@media only screen and (max-width: 1024px) {
  .layout {
    flex-direction: column;
  }
}

.image {
  width: 50vw;
  border-radius: 20px;
}

.front {
  width: 150px;
  object-fit: fill;
  overflow: hidden;
  border-radius: 5px;
}

.back {
  height: 250px;
  object-fit: fill;
  overflow: hidden;
}

.adapt {
  border-radius: 5px;
  width: 100%;
}
</style>
