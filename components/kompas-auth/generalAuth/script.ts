import Vue from 'vue'
import { trimLeadingZero } from '~/components/utils/helper/phoneCodeManipulation'
import { validateEmailFormat } from '~/components/utils/helper/stringManipulation'
import listCountryCode from '~/assets/scripts/constants/countryCode.json'
import { checkSocialEmail } from '~/components/utils/helper/general'
import { storePhoneNum } from '~/components/utils/helper/device'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  data() {
    return {
      showSpinner: false,

      // input field property
      showDropdown: false,
      countryCode: '+62', // default value +62
      listCode: [] as any,
      inputField: '',

      // input field validation
      showInputLabel: true,
      inputEmpty: false,
      generalError: false,
      maxPhoneNumError: false,
      emailError: false,
      otpExceedLimit: false,
      limitAttempt: false,

      // path validation
      pageRoute: '',
    }
  },
  computed: {
    emailValue() {
      return this.$store.state.otp.emailValue
    },
    // indicator to disable btn if auth is blocked
    authBlocked() {
      return this.$store.state.kompasAuth.authBlocked
    },
  },
  mounted() {
    this.listCode = listCountryCode
    // autofill input field from Vuex (if any)
    this.inputField = this.emailValue
    // determine page route
    this.pageRoute = this.$router.currentRoute.path
  },
  methods: {
    chooseCountryCode(value: string) {
      this.countryCode = value
    },
    async continueAuth() {
      // set boolean value to default
      this.otpExceedLimit = false
      this.limitAttempt = false

      if (this.inputField.length) {
        if (!this.generalError && !this.emailError && !this.maxPhoneNumError) {
          // input field valid, processing input
          this.showSpinner = true
          try {
            // phone number input
            if (this.checkInputFormat(this.inputField)) {
              // set country code and phone num to storage
              storePhoneNum(this.$auth.$storage, this.countryCode, this.inputField)
              await this.submitPhoneNum()
            }
            // email input
            else {
              await this.submitEmail()
            }
          } catch (err: any) {
            const errCode = err.response.status
            this.showInputLabel = false
            // both auth email and phone num error max limit attempt (15 times)
            if (errCode === 400) {
              eventTracker('loginMaxAttempt')
              const timer = err.response.data.data.countdown
              this.$store.dispatch('kompasAuth/setAuthBlocked', true)
              this.$store.dispatch('kompasAuth/setTimer', timer)
            }
            // if user phone num exceed limit when send OTP
            if (errCode === 403) {
              if (err.response.data.data.remainingOtp === 0) {
                this.otpExceedLimit = true
              }
            }
            // email has been registered on social
            if (errCode === 409) {
              const socialType = err.response.data.data.registeredOn
              checkSocialEmail(this.$router, socialType, this.emailValue, 'login')
            }
          }
          this.showSpinner = false
        }
      } else {
        // input field empty
        this.showInputLabel = false
        // show general error
        this.inputEmpty = true
      }
    },
    fillInputField(value: string) {
      this.inputField = value
      // set boolean value to default
      this.otpExceedLimit = false
      this.inputEmpty = false
      this.generalError = false
      this.maxPhoneNumError = false
      this.emailError = false

      // show input label
      this.showInputLabel = true

      if (this.inputField.length) {
        // for phone num
        if (this.checkInputFormat(value)) {
          if (this.inputField.length < 6) {
            // hide dropdown and limit min char
            this.showDropdown = false
            this.inputField.length > 0 && this.inputField.length < 6 ? (this.generalError = true) : (this.generalError = false)
          } else {
            // show country code dropdown, trim zero, and limit max char
            this.showDropdown = true
            this.inputField = trimLeadingZero(this.inputField)
            this.inputField.length > 13 ? (this.maxPhoneNumError = true) : (this.maxPhoneNumError = false)
          }

          // if error, show general error txt instead of placeholder input label
          if (this.generalError || this.maxPhoneNumError) {
            this.showInputLabel = false
          }
        }
        // for email
        else {
          this.showDropdown = false
          this.emailError = validateEmailFormat(this.inputField)
          // if error, show email error txt instead of placeholder input label
          if (this.emailError) {
            this.showInputLabel = false
          }
        }
      } else {
        // input field empty, hide dropdown
        this.showDropdown = false
      }
    },
    // regex check if param is text/num
    checkInputFormat(value: string) {
      return /^-?\d+$/.test(value)
    },
    async submitPhoneNum() {
      await this.$store
        .dispatch('kompasAuth/checkLoginStatus', { loginType: 'phoneNumber', value: this.$auth.$storage.getUniversal('countryCode') + this.$auth.$storage.getUniversal('phoneNumber') })
        .then((resp) => {
          const isRegistered = resp.data.data.registered
          this.$store.dispatch('modal/showModalAuth')
          // phone num auth type
          this.$store.dispatch('modal/setAuthType', 'phone')
          if (this.pageRoute.includes('/login')) {
            if (isRegistered) {
              this.$store.dispatch('modal/setAuthTitle', 'Kirim OTP ke Whatsapp')
              this.$store.dispatch('modal/setAuthDesc', 'Kode verifikasi (OTP) akan dikirim melalui WhatsApp ke nomor')
              this.$store.dispatch('modal/setAuthPrimaryBtnText', 'Kirim OTP')
              this.$store.dispatch('modal/setAuthSecondaryBtnText', 'Ubah Nomor')
              this.$store.dispatch('modal/setAuthShowLink', true)
              this.$store.dispatch('modal/setAuthActionBtn', 'login')
            } else {
              this.$store.dispatch('modal/setAuthTitle', 'Nomor Anda Belum Terdaftar')
              this.$store.dispatch('modal/setAuthDesc', 'Kami akan mengirimkan kode verifikasi (OTP), lanjut daftar akun dengan nomor ini')
              this.$store.dispatch('modal/setAuthPrimaryBtnText', 'Daftar')
              this.$store.dispatch('modal/setAuthSecondaryBtnText', 'Ubah Nomor')
              this.$store.dispatch('modal/setAuthShowLink', false)
              this.$store.dispatch('modal/setAuthActionBtn', 'register')
            }
          }
          if (this.pageRoute.includes('/register')) {
            if (isRegistered) {
              this.$store.dispatch('modal/setAuthTitle', 'Nomor sudah Terdaftar')
              this.$store.dispatch('modal/setAuthDesc', 'Lanjut masuk akun dengan nomor ini')
              this.$store.dispatch('modal/setAuthPrimaryBtnText', 'Masuk')
              this.$store.dispatch('modal/setAuthSecondaryBtnText', 'Ubah Nomor')
              this.$store.dispatch('modal/setAuthShowLink', false)
              this.$store.dispatch('modal/setAuthActionBtn', 'login')
            } else {
              this.$store.dispatch('modal/setAuthTitle', 'Nomor Anda sudah Benar?')
              this.$store.dispatch('modal/setAuthDesc', 'Anda akan lanjut daftar akun dengan nomor ini')
              this.$store.dispatch('modal/setAuthPrimaryBtnText', 'Daftar')
              this.$store.dispatch('modal/setAuthSecondaryBtnText', 'Ubah Nomor')
              this.$store.dispatch('modal/setAuthShowLink', false)
              this.$store.dispatch('modal/setAuthActionBtn', 'register')
            }
          }
        })
    },
    async submitEmail() {
      // set email value to Vuex
      this.$store.dispatch('otp/saveEmailValue', this.inputField)
      await this.$store.dispatch('kompasAuth/checkLoginStatus', { loginType: 'email', value: this.inputField }).then((resp) => {
        const isRegistered = resp.data.data.registered
        // email auth type
        this.$store.dispatch('modal/setAuthType', 'email')
        if (isRegistered) {
          if (this.pageRoute.includes('/login')) {
            this.$store.dispatch('kompasAuth/loginByEmail')
            this.$router.push('/login')
          }
          if (this.pageRoute.includes('/register')) {
            this.$store.dispatch('modal/showModalAuth')
            this.$store.dispatch('modal/setAuthTitle', 'Email Sudah Terdaftar')
            this.$store.dispatch('modal/setAuthDesc', 'Lanjut masuk akun dengan email ini')
            this.$store.dispatch('modal/setAuthPrimaryBtnText', 'Masuk')
            this.$store.dispatch('modal/setAuthSecondaryBtnText', 'Ubah Email')
            this.$store.dispatch('modal/setAuthActionBtn', 'login')
            this.$store.dispatch('modal/setAuthShowLink', false)
          }
        } else {
          this.$store.dispatch('modal/showModalAuth')
          this.$store.dispatch('modal/setAuthTitle', 'Email Belum Terdaftar')
          this.$store.dispatch('modal/setAuthDesc', 'Lanjut daftar akun dengan email ini')
          this.$store.dispatch('modal/setAuthPrimaryBtnText', 'Daftar')
          this.$store.dispatch('modal/setAuthSecondaryBtnText', 'Ubah Email')
          this.$store.dispatch('modal/setAuthActionBtn', 'register')
          this.$store.dispatch('modal/setAuthShowLink', false)
        }
      })
    },
  },
})
