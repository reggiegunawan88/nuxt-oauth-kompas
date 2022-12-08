import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  components: { VueRecaptcha },
  props: {
    num: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loginForm: {
        recaptchaVerified: false,
        pleaseTickRecaptchaMessage: '',
      },
      timer: 0,
      isEmailSent: false,
      email: '',
      isEmailEmpty: false,
      errorEmail: false,
      emailNotFound: false,
      incorrectEmail: false,
    }
  },
  head: {
    title: 'Ubah Kata Sandi Akun Kompas.id - Harian Kompas',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Ubah kata sandi akun Kompas.id Anda jika mengalami kendala seputar kata sandi.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'akun kompas, reset password, harian kompas, kompas, langganan kompas, koran kompas, ubah kata sandi',
      },
    ],
  },
  auth: false,
  mounted() {
    const next = this.$auth.$storage.getUniversal('prevUrl')
    if (next && next.includes('qrcode')) {
      eventTracker('qrcloginForgetpassword')
    }
  },
  methods: {
    fillEmail(value: string) {
      this.email = value
    },
    // validasi form
    validateForm(): void {
      // Check if email is empty
      if (this.email === '') {
        this.isEmailEmpty = true
      } else if (this.validateUserData()) {
        // ajax email data
        this.resetEmail()
      }
    },
    validateEmail(email: string): boolean {
      // eslint-disable-next-line max-len
      const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return exp.test(email)
    },
    validateUserData(): boolean {
      this.isEmailEmpty = false
      if (!this.validateEmail(this.email)) {
        this.incorrectEmail = true
        return false
      } else {
        this.incorrectEmail = false
        return true
      }
    },
    onCaptchaExpired() {
      this.loginForm.recaptchaVerified = false
      this.loginForm.pleaseTickRecaptchaMessage = ''
    },
    markRecaptchaAsVerified() {
      this.loginForm.pleaseTickRecaptchaMessage = ''
      this.loginForm.recaptchaVerified = true
    },
    checkIfRecaptchaVerified() {
      if (!this.loginForm.recaptchaVerified) {
        this.loginForm.pleaseTickRecaptchaMessage = 'reCAPTCHA harus dicentang.'
        return true // prevent form from submitting
      } else {
      }
    },
    // after click cta
    async resetEmail() {
      this.errorEmail = false
      this.emailNotFound = false
      this.checkIfRecaptchaVerified()
      if (this.loginForm.recaptchaVerified) {
        try {
          await this.$axios
            .$post('/api/v1/users/password/reset', {
              email: this.email,
            })
            .then(() => {
              this.$store.dispatch('snackbar/showSnackbarSendLink', true)
              this.$store.dispatch('snackbar/showSnackbarWarning', false)
            })
        } catch (err: any) {
          if (err.response.status === 403) {
            // limit 1 minutes
            this.$store.dispatch('snackbar/showSnackbarSendLink', false)
            this.$store.dispatch('snackbar/showSnackbarWarning', true)
            this.$store.dispatch('snackbar/setSnackbarWarningDesc', 'Tautan verifikasi telah dikirim ke email Anda. Jika belum diterima, Anda dapat mengirim ulang tautan dalam 1 menit.')
          }
          if (err.response.status === 404) {
            // email not found
            this.incorrectEmail = false
            this.errorEmail = true
            this.emailNotFound = true
          }
        }
      }
    },
  },
})
