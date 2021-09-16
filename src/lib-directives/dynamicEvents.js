export default {
  bind(el, binding, vnode) {
    const allEvents = binding.value
    allEvents.forEach(event => {
      console.log(event)
      vnode.componentInstance.$on(event, eventData => {
        vnode.context.proxyEvent(event, eventData)
      })
    })
  },
  unbind: function(el, binding, vnode) {
    vnode.componentInstance.$off()
  },
}

/**
 * TODO why bind is not called??
 */

/**
 * Special thanks to:
 * https://forum.vuejs.org/t/dynamic-props-and-custom-event-emit-in-dynamic-component/10932/2
 */
