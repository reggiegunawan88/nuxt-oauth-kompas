import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  layout: 'onboarding',
  methods: {
    btnContinueReading() {
      eventTracker('subsContinueReading')
      const nextUrl = this.$route.query.next
      if (nextUrl) {
        window.location.href = nextUrl as string
      } else {
        window.location.href = this.$config.redirect
      }
    },
  },
})
