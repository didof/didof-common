<template>
  <WindowSizesProvider>
    <DeviceProvider>
      <div v-center class="column">
        <TwoFaces>
          <template #front>
            <div class="front" v-center>
              front
            </div>
          </template>
          <template #back>
            <div class="back" v-center>
              back
            </div>
          </template>
        </TwoFaces>
        <TwoFaces>
          <template #front>
            <div class="front" v-center>
              front
            </div>
          </template>
          <template #back>
            <div class="back" v-center>
              back
            </div>
          </template>
        </TwoFaces>
        <TwoFaces>
          <template #front>
            <div class="front" v-center>
              front
            </div>
          </template>
          <template #back>
            <div class="back" v-center>
              back
            </div>
          </template>
        </TwoFaces>
      </div>
    </DeviceProvider>
  </WindowSizesProvider>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'demo',
})
</script>

<style scoped>
.front {
  width: 150px;
  background: red;
}

.back {
  height: 200px;
  background: blue;
}

.column {
  width: 100vw;
  height: 200vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
</style>
