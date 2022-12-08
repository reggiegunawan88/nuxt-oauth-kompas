import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { validateEmptyValue } from '~/components/utils/helper/stringManipulation'
import { getDeviceName, getDeviceType } from '~/components/utils/helper/device'
import { anchoringErrorField } from '~/components/utils/helper/anchoring'
export default Vue.extend({
  components: { VueRecaptcha },
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
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

    // loading spinner
    showSpinner: false,
  }),
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
      this.incorrectEmail = !this.validateEmail(this.email)
    },
    validateEmail(email: string): boolean {
      // eslint-disable-next-line max-len
      const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return exp.test(email)
    },
    // validate on CTA action
    submitData(): void {
      this.isFirstNameEmpty = validateEmptyValue(this.firstName)
      this.isEmailEmpty = validateEmptyValue(this.email)
      if (this.anchoringToErrorField()) {
        this.registerUser()
      }
    },

    async registerUser() {
      this.showSpinner = true
      try {
        // get prev url (if any)
        const authPrevurl = this.$auth.$storage.getUniversal('prevUrl')
        await this.$axios
          .$post('/api/v2/register/phone', {
            /* trim any whitespace leading and trailing */
            email: this.email.trim().toLowerCase(),
            firstName: this.firstName.trim(),
            lastName: this.lastName.trim(),
            countryCode: this.$auth.$storage.getUniversal('countryCode').toString() || 0,
            phoneNumber: this.$auth.$storage.getUniversal('phoneNumber').toString() || 0,
            docReferrer: authPrevurl,
            device: getDeviceName(),
            deviceType: getDeviceType(),
          })
          .then(() => {
            eventTracker('registerPhoneSuccess')
            if (authPrevurl.includes('qrcode')) {
              window.location.href = `${authPrevurl}&qrcType=register`
            } else {
              window.location.href = this.$config.redirect
            }
          })
      } catch (err: any) {
        const errCode = err.response.status
        // email exist with unregistered phone num
        if (errCode === 409) {
          this.isEmailExist = true
          this.anchoringToErrorField()
        }
      }
      this.showSpinner = false
    },
    onScore({ score }: any) {
      // eslint-disable-next-line no-console
      const data = this.$props
      data.score = score
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
      ]
      return anchoringErrorField(listElements)
    },
  },
})
