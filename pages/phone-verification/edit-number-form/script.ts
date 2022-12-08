import Vue from 'vue'
import { storePhoneNum } from '~/components/utils/helper/device'

export default Vue.extend({
  data() {
    return {
      loading: false,
      token: '',
      countryCode: '',
      phoneNumber: '',
    }
  },
  computed: {
    jwtActive() {
      return this.$store.state.kompasAuth.jwtActive
    },
  },
  mounted() {
    this.token = this.$route.query.token as string
    this.verifyJWT()
  },
  methods: {
    async verifyJWT() {
      await this.$store.dispatch('kompasAuth/validateJWT', this.token)
      if (!this.jwtActive) {
        // push countryCode and phoneNumber via query params
        this.$router.push({ path: '/phone-verification/invalid-link', query: { countryCode: this.$route.query.countryCode, phoneNumber: this.$route.query.phoneNumber } })
      }
    },
    // set phone num value based on child reusable component
    setPhoneNumber(e: any) {
      this.countryCode = e.code
      this.phoneNumber = e.value
    },
    async submitPhoneNum() {
      if (this.phoneNumber) {
        storePhoneNum(this.$auth.$storage, this.countryCode, this.phoneNumber)
        this.loading = true
        // flag 2 -> update phone num
        await this.$store.dispatch('otp/sendUpdatedPhoneNumber', { jwt: this.token, phoneNumber: this.phoneNumber, countryCode: this.countryCode, flag: 2 })
        this.loading = false
      }
    },
  },
})
