import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  props: ['type'],
  methods: {
    async authFB() {
      const next = this.$auth.$storage.getUniversal('prevUrl')
      if (this.$props.type === 'login') {
        eventTracker('loginFacebook')
        if (next && next.includes('qrcode')) {
          eventTracker('qrcloginFacebook')
        }
      } else {
        eventTracker('registerFacebook')
        if (next && next.includes('qrcode')) {
          eventTracker('qrcregisterFacebook')
        }
      }
      try {
        await this.$auth.loginWith('facebook', { params: { client_id: this.$config.fbAppid } })
      } catch (error) {
        console.error(error)
      }
    },
  },
})
