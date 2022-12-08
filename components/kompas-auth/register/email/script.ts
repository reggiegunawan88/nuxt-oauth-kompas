import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { validateEmailFormat, validateEmptyValue } from '~/components/utils/helper/stringManipulation'
import { getDeviceName, getDeviceType } from '~/components/utils/helper/device'
import { anchoringErrorField } from '~/components/utils/helper/anchoring'
export default Vue.extend({
  components: { VueRecaptcha },
  data() {
    return {
      // submit data (mandatory)
      firstName: '',
      email: '',
      // end

      // (optional)
      lastName: '',

      isEmailEmpty: false,
      isFirstNameEmpty: false,
      isEmailExist: false,
      incorrectFirstName: false,
      incorrectLastName: false,
      incorrectEmail: false,

      // recaptcha
      recaptchaVerified: false,
      recaptchaMessage: '',
    }
  },
  mounted() {
    // auto fill email from store (if any)
    this.email = this.$store.state.otp.emailValue
  },
  methods: {
    nameInput(e: { keyCode: number; preventDefault: () => void }) {
      const char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z ']+$/.test(char)) return true
      else e.preventDefault()
    },
    // prevent space on first input
    preventSpace(e: any, value: string) {
      if (validateEmptyValue(value)) {
        e.preventDefault()
      }
    },
    // regex validation for mobile view only
    fillFirstName(value: string): void {
      this.isFirstNameEmpty = validateEmptyValue(value)
      this.incorrectFirstName = false
      if (!this.isFirstNameEmpty) {
        if (/^[A-Za-z ']+$/.test(value)) this.incorrectFirstName = false
        else this.incorrectFirstName = true
      }
    },
    // not mandatory, regex validation for mobile view only
    fillLastName(value: string): void {
      this.incorrectLastName = false
      if (value.length) {
        if (/^[A-Za-z ']+$/.test(value)) this.incorrectLastName = false
        else this.incorrectLastName = true
      }
    },
    fillEmail(value: string): void {
      this.email = value.toLowerCase()
      this.isEmailExist = false
      this.isEmailEmpty = validateEmptyValue(value)
    },
    checkEmailFormat() {
      this.isEmailEmpty = validateEmptyValue(this.email)
      this.incorrectEmail = validateEmailFormat(this.email)
    },
    markRecaptchaAsVerified() {
      this.recaptchaMessage = ''
      this.recaptchaVerified = true
    },
    markRecaptchaAsExpired() {
      this.recaptchaMessage = 'reCAPTCHA harus dicentang'
      this.recaptchaVerified = false
    },
    validateRecaptcha() {
      // true -> error, false -> valid (for anchoring function)
      if (!this.recaptchaVerified) {
        this.recaptchaMessage = 'reCAPTCHA harus dicentang.'
        return true
      }
      return false
    },
    // validate on CTA action
    submitData(): void {
      this.isFirstNameEmpty = validateEmptyValue(this.firstName)
      this.isEmailEmpty = validateEmptyValue(this.email)
      this.$store.dispatch('password/isPasswordEmpty', validateEmptyValue(this.$store.getters['password/getPasswordValue']))
      if (this.anchoringToErrorField()) {
        this.registerUser()
      }
    },

    async registerUser() {
      eventTracker('registerEmail')
      try {
        // get prev url (if any)
        const authPrevurl = this.$auth.$storage.getUniversal('prevUrl')
        await this.$axios
          .$post('/api/v1/register', {
            /* trim any whitespace leading and trailing */
            email: this.email.trim().toLowerCase(),
            password: this.$store.getters['password/getPasswordValue'].trim(),
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            docReferrer: authPrevurl,
            device: getDeviceName(),
            deviceType: getDeviceType(),
          })
          .then((response: any) => {
            if (authPrevurl.includes('qrcode')) {
              window.location.href = `${authPrevurl}&qrcType=register`
            } else {
              this.$router.push({
                path: '/register/success',
                query: { docReferrer: response.data.docReferrer },
              })
            }
          })
      } catch (err) {
        eventTracker('registerEmailFailed')
        this.isEmailExist = true
        this.anchoringToErrorField()
      }
    },
    // anchor to error input field
    anchoringToErrorField() {
      // list DOM elements
      const listElements = [
        {
          element: this.$refs.firstName,
          error: validateEmptyValue(this.firstName) || this.incorrectFirstName,
        },
        {
          element: this.$refs.lastName,
          error: this.incorrectLastName,
        },
        {
          element: this.$refs.email,
          error: validateEmptyValue(this.email) || this.incorrectEmail || this.isEmailExist,
        },
        {
          element: this.$refs.password,
          error: this.$store.getters['password/isPasswordEmpty'] || this.$store.getters['password/getPasswordScore'] < 2, // password strength below 2 (weak)
        },
        {
          element: this.$refs.recaptcha,
          error: this.validateRecaptcha(),
        },
      ]
      return anchoringErrorField(listElements)
    },
  },
})
