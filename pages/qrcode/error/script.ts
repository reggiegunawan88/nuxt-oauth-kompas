import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  layout: 'onboardingLayout',
  methods: {
    goToBerlangganan() {
      /* GTM tracker */
      eventTracker('qrcerrorLangganan')

      window.location.href = 'https://www.kompas.id/berlangganan'
    },
    handleTracker(trackerEvent: any) {
      /* GTM tracker */
      eventTracker(trackerEvent)
    },
  },
})
