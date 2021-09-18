import * as components from '@/lib-components/index'
import * as directives from '@/lib-directives/index'

function makeInstaller(type, elements) {
  return function install(app) {
    Object.entries(elements).forEach(([name, module]) => {
      app[type](name, module)
    })
    console.info(`Installed ${type}s: ${Object.keys(elements).join(', ')}`)
  }
}

const installComponents = makeInstaller('component', components)
const installDirectives = makeInstaller('directive', directives)

export default {
  components: installComponents,
  directives: installDirectives,
}

export * from '@/lib-components/index'
export * from '@/lib-directives/index'
