<template>
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
</template>

<script>
import { defineComponent } from 'vue'

import TwoFaces from '@/lib-components'

export default defineComponent({
  name: 'two-faces-demo',
  components: { TwoFaces },
})
</script>

<style scoped>
.front {
  width: 150px;
}

.back {
  height: 200px;
}

.adapt {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
</style>
