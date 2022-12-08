import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async revoke() {
      // Tracker
      eventTracker('revokeAksesAkun')

      const clientID = this.$store.state.modal.clientID
      // set loading bar to await API revoke
      this.loading = true
      await this.$store.dispatch('sso/revokeSSO', clientID)
      await this.$store.dispatch('sso/getSSOList')
      this.loading = false
      // end of loading
      this.$store.dispatch('modal/hideModalSSO')
    },
  },
})
