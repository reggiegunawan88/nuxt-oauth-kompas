import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  props: ['type'],
  methods: {
    authApple() {
      const next = this.$auth.$storage.getUniversal('prevUrl')
      if (this.$props.type === 'login') {
        eventTracker('loginApple')
        if (next && next.includes('qrcode')) {
          eventTracker('qrcloginApple')
        }
      } else {
        eventTracker('registerApple')
        if (next && next.includes('qrcode')) {
          eventTracker('qrcregisterApple')
        }
      }
      this.$store.dispatch('kompasAuth/appleIDAuth')
    },
  },
})
