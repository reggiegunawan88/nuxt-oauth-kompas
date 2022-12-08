import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  props: ['type'],
  methods: {
    async authGmail() {
      const next = this.$auth.$storage.getUniversal('prevUrl')
      if (this.$props.type === 'login') {
        eventTracker('loginGoogle')
        if (next && next.includes('qrcode')) {
          eventTracker('qrcloginGoogle')
        }
      } else {
        eventTracker('registerGoogle')
        if (next && next.includes('qrcode')) {
          eventTracker('qrcregisterGoogle')
        }
      }
      try {
        await this.$auth.loginWith('google', { params: { client_id: this.$config.googleappid } })
      } catch (error) {
        console.error(error)
      }
    },
  },
})
