import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  Card: () => import('../../components/Card.vue' /* webpackChunkName: "components/card" */).then(c => wrapFunctional(c.default || c)),
  Dropdown: () => import('../../components/Dropdown.vue' /* webpackChunkName: "components/dropdown" */).then(c => wrapFunctional(c.default || c)),
  PageFooter: () => import('../../components/PageFooter.vue' /* webpackChunkName: "components/page-footer" */).then(c => wrapFunctional(c.default || c)),
  PageHeader: () => import('../../components/PageHeader.vue' /* webpackChunkName: "components/page-header" */).then(c => wrapFunctional(c.default || c)),
  SideMenu: () => import('../../components/SideMenu.vue' /* webpackChunkName: "components/side-menu" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
