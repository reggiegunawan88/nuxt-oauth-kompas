import Vue from 'vue'
import jwtDecode from 'jwt-decode'

export default Vue.extend({
  data() {
    return {
      jwt: '' as any,
      isLogin: false,
    }
  },
  computed: {
    // user verified/un-verified (get from Vuex)
    userVerified() {
      return this.$store.state.kompasAuth.userVerified
    },
    // user token is on logged out state
    userLoggedOut() {
      return this.$store.state.kompasAuth.userLoggedOut
    },
    // is token active/expired?
    tokenActive() {
      return this.$store.state.kompasAuth.jwtActive
    },
  },
  mounted() {
    this.jwt = this.$route.query.token
    this.verifyUser()
  },
  methods: {
    // validate browser query JWT
    decodeJWT(): Object {
      return jwtDecode(this.jwt)
    },
    // resend email if url is expired
    resendEmailVerification() {
      const parsedJWT: any = this.decodeJWT()
      this.$store.dispatch('kompasAuth/resendEmailVerification', { token: this.jwt, email: parsedJWT.data.email })
    },
    async verifyUser() {
      await this.$store.dispatch('kompasAuth/verifyUser', this.jwt)
    },
  },
})
