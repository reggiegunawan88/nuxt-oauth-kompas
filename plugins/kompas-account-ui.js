import Vue from 'vue'
import { applyPolyfills, defineCustomElements } from '@kompas/account-ui/loader'

Vue.config.productionTip = false

/**
 * Bind the custom elements to the window object
 * Add Prefix 'kau-' for kompas-account-ui
 */
applyPolyfills().then(() => {
  defineCustomElements('', { transformTagName: (tagName) => `kau-${tagName}` })
})
