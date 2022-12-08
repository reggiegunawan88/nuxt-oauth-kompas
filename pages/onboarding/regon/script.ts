import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  layout: 'onboarding',
  methods: {
    startReading() {
      eventTracker('regonContinueReading')
      const nextUrl = this.$route.query.next
      if (nextUrl) {
        window.location.href = nextUrl as string
      } else {
        window.location.href = this.$config.redirect
      }
    },
    /* redirect to external URL link */
    redirectTurvis() {
      eventTracker('regonTurvis')
      window.open('https://interaktif.kompas.id/', '_blank')
    },
    redirectInfografik() {
      eventTracker('regonInfografik')
      window.open('https://www.kompas.id/multimedia/eksternal/infografik/', '_blank')
    },
    redirectVideo() {
      eventTracker('regonVideo')
      window.open('https://www.kompas.id/kategori/video/', '_blank')
    },
    redirectRiset() {
      eventTracker('regonRiset')
      window.open('https://www.kompas.id/kategori/riset/', '_blank')
    },
  },
})
