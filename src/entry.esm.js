import * as components from '@/lib-components/index'
import * as directives from '@/lib-directives/index'

function makeInstaller(type, elements) {
  return function install(app) {
    Object.entries(elements).forEach(([name, func]) => {
      app[type](name, func)
    })
  }
}

const installComponents = makeInstaller('component', components)
const installDirectives = makeInstaller('directive', directives)

export default {
  components: installComponents,
  directives: installDirectives,
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index'
export * from '@/lib-directives/index'
