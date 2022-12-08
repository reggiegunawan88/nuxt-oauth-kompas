import Vue from 'vue'

export default Vue.extend({
  layout: 'vendorAuthPage',
  data() {
    return {
      linkedAccess: false,
    }
  },
  computed: {
    // Get Query data
    queryData() {
      const data = this.$route.query
      return data
    },
    reidrectUri() {
      const url = this.$route.query.redirect_uri
      // @ts-ignore
      const reidrectUri = url.split('client_id=')
      return reidrectUri
    },
    // state ssoAuthCode
    ssoAuthCode() {
      return this.$store.state.sso.ssoAuthCode.data
    },
  },
  mounted() {
    // Check SSO Cookie
    const ssoCookie = this?.$cookies.get('kompas._sso_cookie')
    if (ssoCookie) {
      this.linkedAccess = true
      this.handleAccess()
    } else {
      this.linkedAccess = false
    }
  },
  methods: {
    // Handle button Beri Akses
    async handleAccess() {
      let scope = this.queryData.scope
      if (scope.includes('?')) {
        // @ts-ignore
        scope = scope.substring(0, scope.indexOf('?'))
      }
      const state = this.queryData.state
      const responseType = this.queryData.response_type

      const data = {
        state,
        scope,
        responseType,
        client_id: this.reidrectUri[1],
        redirect_uri: this.reidrectUri[0],
      }

      // Get authorization code API
      await this.$store.dispatch('sso/getAuthorizationCode', data)

      // Redirect to third party
      window.location.href = `${this.reidrectUri[0]}?authorization_code=${this.ssoAuthCode.authorization_code}&state=${state}&scope=${scope}`
    },
    handleCancel() {
      window.close()
    }
  },
})
