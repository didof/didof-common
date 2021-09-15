export function registerComponents(list) {
  return Object.entries(list).reduce(
    (acc, [name, component]) => (acc[name] = component)
  )
}
