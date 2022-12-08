import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { trimLeadingZero } from '~/components/utils/helper/phoneCodeManipulation'
export default Vue.extend({
  data() {
    return {
      showSpinner: false,
    }
  },
  computed: {
    modalData() {
      return this.$store.state.modal.auth
    },
  },
  methods: {
    actionBtn() {
      if (this.modalData.type === 'phone') {
        this.sendOTP()
      }
      if (this.modalData.type === 'email') {
        // hide modal auth
        this.$store.dispatch('modal/hideModalAuth')
        if (this.modalData.actionBtn === 'login') {
          this.login()
        } else {
          this.register()
        }
      }
    },
    /* button CTA handler for each action */
    async sendOTP() {
      let flagIndicator = 0
      // 1: register || 2: login
      this.modalData.actionBtn === 'register' ? (flagIndicator = 1) : (flagIndicator = 2)
      // loading spinner
      this.showSpinner = true
      await this.$store.dispatch('otp/sendOTPCode', { flag: flagIndicator, phoneNumber: this.$auth.$storage.getUniversal('phoneNumber'), countryCode: this.$auth.$storage.getUniversal('countryCode') })
      this.showSpinner = false
    },
    login() {
      this.$store.dispatch('kompasAuth/loginByEmail')
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register/email-registration')
    },

    // for user inactive phone number
    async requestChangePhoneNum() {
      eventTracker('resetNumber')
      await this.$store.dispatch('otp/updatePhoneNumber', { phoneNumber: this.getPhoneNumber(), countryCode: this.getCountryCode() })
    },

    /* get value for DOM */
    getCountryCode() {
      return this.$auth.$storage.getUniversal('countryCode')
    },
    getPhoneNumber() {
      return trimLeadingZero(this.$auth.$storage.getUniversal('phoneNumber'))
    },
    getEmailValue() {
      return this.$store.state.otp.emailValue
    },
  },
})
