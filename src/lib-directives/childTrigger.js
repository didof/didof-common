export default {
  mounted: function(el, binding, vnode) {
    // console.log(binding.instance)
    const trigger = binding.value
    const childMethodName = Object.keys(binding.modifiers)

    const childMethod = binding.instance[childMethodName]

    console.log('childMethodName', childMethodName)
    console.log('childMethod', childMethod)

    console.log(binding, vnode)
  },
}
