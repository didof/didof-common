<template>
  <span ref="observed">
    <slot></slot>
  </span>
</template>

<script type="text/javascript">
import {
  defineComponent,
  ref,
  toRef,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue'

export default defineComponent({
  name: 'intersection-observer',
  emit: ['in', 'out', 'observe', 'disconnect', 'update'],
  props: ['threshold'],
  setup(props, context) {
    let el = ref(null)
    let observer
    const threshold = toRef(props, 'threshold').value

    onMounted(() => {
      mountObserver()
      context.emit('observe')
    })

    watch(threshold, (currentValue, oldValue) => {
      observer.disconnect()
      mountObserver()
      context.emit('update', {
        name: 'threshold',
        currentValue,
        oldValue,
      })
    })

    onBeforeUnmount(() => {
      observer.disconnect()
      context.emit('disconnect')
    })

    function mountObserver() {
      observer = new IntersectionObserver(watchEntries, { threshold })
      observer.observe(el.value)
    }

    function watchEntries(entries) {
      entries.forEach(entry => {
        const label = entry.isIntersecting ? 'in' : 'out'
        context.emit(label, entry)
      })
    }

    return {
      observed: el,
    }
  },
})
</script>

<style scoped>
span {
  display: inline-block;
}
</style>
