export { default as Card } from '../../components/Card.vue'
export { default as Dropdown } from '../../components/Dropdown.vue'
export { default as PageFooter } from '../../components/PageFooter.vue'
export { default as PageHeader } from '../../components/PageHeader.vue'
export { default as SideMenu } from '../../components/SideMenu.vue'

export const LazyCard = import('../../components/Card.vue' /* webpackChunkName: "components/card" */).then(c => wrapFunctional(c.default || c))
export const LazyDropdown = import('../../components/Dropdown.vue' /* webpackChunkName: "components/dropdown" */).then(c => wrapFunctional(c.default || c))
export const LazyPageFooter = import('../../components/PageFooter.vue' /* webpackChunkName: "components/page-footer" */).then(c => wrapFunctional(c.default || c))
export const LazyPageHeader = import('../../components/PageHeader.vue' /* webpackChunkName: "components/page-header" */).then(c => wrapFunctional(c.default || c))
export const LazySideMenu = import('../../components/SideMenu.vue' /* webpackChunkName: "components/side-menu" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
export function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
