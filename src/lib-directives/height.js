export default {
  mounted(el, binding) {
    const { value } = binding
    if (value) el.style.height = value + 'px'
    else el.style.height = '100%'
  },
}
