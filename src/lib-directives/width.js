export default {
  mounted(el, binding) {
    const { value } = binding
    if (value) el.style.width = value + 'px'
    else el.style.width = '100%'
  },
}
