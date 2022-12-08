import Vue from 'vue'
import jwtDecode from 'jwt-decode'

export default Vue.extend({
  computed: {
    // Decode JWT Token
    decodeJWT() {
      const jwt: any = this?.$cookies.get('kompas._token_refresh')
      return jwtDecode(jwt)
    },
    // Get label from query state
    labelFromQuery() {
      const query = this.$route.query?.state
      let label = null
      if (query) {
        // @ts-ignore
        label = query.replace('_', ' ')
      }
      return label
    },
    // Get scope from query scope
    scopeFromQuery() {
      let query = this.$route.query?.scope
      if (query.includes('?')) {
        // @ts-ignore
        query = query.substring(0, query.indexOf('?'))
      }
      let scope = null
      if (query) {
        // @ts-ignore
        scope = query.split(',')
      }
      return scope
    },
  },
})
