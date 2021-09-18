<template>
  <div class="layout">
    <img src="@/assets/img/TwoFaces.png" class="image" />
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
  width: 15vw;
}

.back {
  height: 15vh;
}

.adapt {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
