import Vue from 'vue'

export default Vue.extend({
  layout: 'vendorAuthPage',
  mounted() {
    this.authChecking()
  },
  methods: {
    // Handling authentication checking
    authChecking() {
      const origin = window.location
      const params = this.$route.query
      const querystring = require('querystring')
      const kantormu = this.$cookies.get('kantormu')
      const queryString = querystring.stringify(params)

      // Cookie check
      if (kantormu) {
        window.location.href = `/sso/link?${queryString}`
      } else {
        const queryForLogin = `next=${origin.origin}/sso/link?${queryString}`
        window.location.href = `/login?${queryForLogin}`
      }
    },
  },
})
