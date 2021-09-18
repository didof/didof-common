import * as components from '@/lib-components'

export function registerComponents(list) {
  return Object.entries(list).reduce(
    (acc, [name, component]) => (acc[name] = component)
  )
}

export default function registerAllComponents() {
  return registerComponents(components)
}
