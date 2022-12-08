import Vue from 'vue'
import jwtDecode from 'jwt-decode'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  data() {
    return {
      userVerified: null,
    }
  },
  computed: {
    userDataCompleted() {
      return this.$store.state.kelolaAkun.userDataComplete
    },
  },
  mounted() {
    // get verified indicator from cookies
    this.userVerified = this.$cookies.get('kompas._status')?.isVerified
  },
  methods: {
    completeProfile() {
      eventTracker('filldataWidget')
      this.$router.push('/manage-account/account-detail/personal-data/edit')
    },
    decodeJWT(): Object {
      const jwt: any = this.$cookies.get('kompas._token')
      return jwtDecode(jwt)
    },
    async resendEmailVerification() {
      const jwt: any = this.decodeJWT()
      const userEmail = jwt.data.email
      eventTracker('verifyWidget')
      await this.$store.dispatch('kelolaAkun/resendEmailVerification', { userEmail })
    },
  },
})
