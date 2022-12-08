import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  data() {
    return {
      // phone num data
      countryCode: '',
      phoneNum: '',

      showSpinner: false,
      flagNum: 0,
      otpCode: '',
      otpComplete: false,

      // error msg boolean
      otpError: false,
      otpUnmatched: false,
      otpExpired: false,
      otpExceedLimit: false,
      resendOTPBlocked: false,
    }
  },
  computed: {
    otpTimer() {
      return this.$store.state.otp.otpTimer
    },
  },
  watch: {
    otpTimer() {
      this.countdownTimer()
    },
  },
  mounted() {
    // determine otp type
    const otpAuthType = this.$route.query?.otpType as string
    if (otpAuthType === 'register') {
      this.flagNum = 1
    } else if (otpAuthType === 'login') {
      this.flagNum = 2
    } else {
      this.flagNum = 3
    }

    // get phone num value from storage
    this.countryCode = this.$auth.$storage.getUniversal('countryCode').toString()
    this.phoneNum = this.$auth.$storage.getUniversal('phoneNumber').toString()

    if (this.otpTimer > 0) {
      this.countdownTimer()
    }
  },
  methods: {
    inputCode(val: string) {
      // remove warning msg on type OTP
      this.otpError = false
      this.otpUnmatched = false
      this.otpExpired = false
      this.resendOTPBlocked = false

      this.otpCode = val
      if (this.otpCode.length === 6) {
        this.otpComplete = true
      } else {
        this.otpComplete = false
      }
    },
    async submitOTPCode() {
      eventTracker('OTPVerification')
      // set false to all error boolean
      this.otpError = false
      this.otpUnmatched = false
      this.otpExpired = false
      this.otpExceedLimit = false

      this.showSpinner = true
      try {
        await this.$store.dispatch('otp/submitOTPCode', { phoneNum: this.phoneNum, countryCode: this.countryCode, otpCode: this.otpCode }).then(() => {
          eventTracker('OTPVerificationSuccess')
          if (this.flagNum === 1) {
            // redirect to register page
            this.$router.push('/register/otp-registration')
          } else {
            // redirect to entry page url
            window.location.href = this.$auth.$storage.getUniversal('prevUrl')
          }
        })
      } catch (error: any) {
        const errCode = error.response.status
        this.otpError = true
        // otp not match
        if (errCode === 400) {
          eventTracker('OTPVerificationFailed')
          this.otpUnmatched = true
        }
        // otp expired
        if (errCode === 406) {
          eventTracker('OTPExpired')
          this.otpExpired = true
        }
      }
      this.showSpinner = false
    },
    async resendOTP() {
      eventTracker('OTPResendLink')
      // set false to all error boolean
      this.otpError = false
      this.otpUnmatched = false
      this.otpExpired = false
      this.otpExceedLimit = false

      try {
        await this.$store.dispatch('otp/resendOTPCode', { flag: this.flagNum, phoneNumber: this.phoneNum, countryCode: this.countryCode }).then((resp) => {
          eventTracker('OTPResendSuccess')
          this.$store.dispatch('snackbar/showSnackbarSuccess', true)
          this.$store.dispatch('snackbar/setSnackbarDesc', 'Kode verifikasi (OTP) baru telah dikirim ke WhatsApp Anda.')
          this.$store.dispatch('otp/setOTPTimer', resp.data.data.countdown)
        })
      } catch (error: any) {
        const errCode = error.response.status
        const timer = error.response.data.data.countdown
        const remainingOtp = error.response.data.data.remainingOtp
        this.otpError = true
        // remaining otp is used up
        if (remainingOtp === 0) {
          eventTracker('OTPMaxResend')
          this.otpExceedLimit = true
        }
        // re-sending otp still block within timer
        if (remainingOtp > 0 && errCode === 403) {
          this.resendOTPBlocked = true
          this.$store.dispatch('otp/setOTPTimer', timer)
        }
      }
    },
    getPhoneNumber() {
      return this.$auth.$storage.getUniversal('phoneNumber')
    },
    redirectAuth() {
      eventTracker('OTPAnotherMethod')
      this.$router.push('/login')
    },
    countdownTimer() {
      if (this.otpTimer > 0) {
        setTimeout(() => {
          this.$store.dispatch('otp/decreaseTimer')
        }, 1000)
      } else {
        this.otpError = false
        this.resendOTPBlocked = false
      }
    },
  },
})
