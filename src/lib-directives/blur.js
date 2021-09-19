export default {
  mounted: function(el, binding) {
    el.clickOutsideEvent = function(event) {
      if (el !== event.target) {
        binding.instance[binding.value.name](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}
