import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      countryCode: '',
      phoneNumber: '',
    }
  },
  mounted() {
    const queryParams = this.$route.query as any
    this.countryCode = queryParams.countryCode
    this.phoneNumber = queryParams.phoneNumber
  },
  methods: {
    async resendEmailUpdatePhone() {
      await this.$store.dispatch('otp/updatePhoneNumber', { phoneNumber: this.phoneNumber, countryCode: this.countryCode, route: 'invalid-link' })
    },
  },
})
