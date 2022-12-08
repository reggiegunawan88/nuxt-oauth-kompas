import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { deleteCookiesOnboarding } from '~/components/utils/helper/general'

export default Vue.extend({
  layout: 'onboarding',
  methods: {
    skipPage() {
      eventTracker('skipPage')
      const nextUrl = this.$route.query.track_content as string
      deleteCookiesOnboarding(this.$cookies, this.$config, this.$router, nextUrl)
    },
  },
})
