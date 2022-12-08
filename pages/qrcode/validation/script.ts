import Vue from 'vue'
import { validateEmptyValue, maxPhoneNumLength, minPhoneNumLength } from '~/components/utils/helper/stringManipulation'
import { formatPhoneNumberData, separatePhoneNumberData } from '~/components/utils/helper/phoneCodeManipulation'
import { anchoringErrorField } from '~/components/utils/helper/anchoring'
import listCountryCode from '~/assets/scripts/constants/countryCode.json'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  layout: 'onboardingLayout',
  middleware: 'setToken',
  data() {
    return {
      /* country code id */
      countryCode: '62',
      list: [] as any,

      // submit data (mandatory)
      firstName: '',
      email: '',
      phoneNumber: '',
      // end

      // (optional)
      lastName: '',

      isEmailEmpty: false,
      isFirstNameEmpty: false,
      isPhoneNumberEmpty: false,
      incorrectFirstName: false,
      incorrectLastName: false,
      incorrectEmail: false,
      incorrectPhoneNumber: false,
      maxPhoneNumber: false,
      minPhoneNumber: false,

      loadingValidate: true,
    }
  },
  computed: {
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
  },
  watch: {
    // watch user data changes
    async userData() {
      await this.setFormData()
    },
    loadingValidate(val) {
      if (!val) {
        this.list = formatPhoneNumberData(listCountryCode)
        this.$store.dispatch('kelolaAkun/getUserData')
      }
    },
  },
  mounted() {
    this.codeValidation()
  },
  methods: {
    nameInput(e: { keyCode: number; preventDefault: () => void }) {
      const char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z ']+$/.test(char)) return true
      else e.preventDefault()
    },
    /**
     * Prevent Phone Number to type other than Number
     * @param e Event
     */
    phoneNumberInput(e: { keyCode: number; preventDefault: () => void }) {
      const char = String.fromCharCode(e.keyCode)
      if (this.checkPhoneNumberFormat(char)) return true
      else e.preventDefault()
    },
    fillPhoneNum(value: string) {
      this.phoneNumber = value
      this.isPhoneNumberEmpty = validateEmptyValue(value)
      this.incorrectPhoneNumber = false
      this.maxPhoneNumber = maxPhoneNumLength(this.phoneNumber)
      this.minPhoneNumber = minPhoneNumLength(this.phoneNumber)

      // check if phone number value is exist
      if (!this.isPhoneNumberEmpty) {
        // check if string contains only char [0-9]
        if (this.checkPhoneNumberFormat(this.phoneNumber)) {
          this.incorrectPhoneNumber = false
        } else {
          this.incorrectPhoneNumber = true
          this.maxPhoneNumber = false
          this.minPhoneNumber = false
        }
      }
    },
    checkPhoneNumberFormat(phone: string): boolean {
      const exp = /^\d+$/
      return exp.test(phone)
    },
    chooseCountryCode(value: string) {
      this.countryCode = value
    },
    /** Validate if phone number has error
     *  @return Boolean
     *  false => no error
     *  true => error
     * */
    validatePhoneNumber(): boolean {
      return validateEmptyValue(this.phoneNumber) || minPhoneNumLength(this.phoneNumber) || maxPhoneNumLength(this.phoneNumber)
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
          error: validateEmptyValue(this.email) || this.incorrectEmail,
        },
        {
          element: this.$refs.phoneNumber,
          error: this.validatePhoneNumber(),
        },
      ]
      return anchoringErrorField(listElements)
    },
    setFormData(): void {
      // Separate Phone Code with Phone Number
      const phoneCodeData = separatePhoneNumberData(this.userData.phoneNumber, this.list)

      this.email = this.userData.email
      this.firstName = this.userData.firstName
      this.lastName = this.userData.lastName
      this.countryCode = phoneCodeData.countryCode.length ? phoneCodeData.countryCode : '62'
      this.phoneNumber = phoneCodeData.phoneNumber
    },
    /* Submit Form Action */
    async submitForm() {
      /* GTM tracker */
      eventTracker('qrcformSubmit')

      // validate user input
      this.isFirstNameEmpty = validateEmptyValue(this.firstName)
      this.isPhoneNumberEmpty = validateEmptyValue(this.phoneNumber)
      this.minPhoneNumber = minPhoneNumLength(this.phoneNumber)
      this.maxPhoneNumber = maxPhoneNumLength(this.phoneNumber)

      // error checking
      if (this.isFirstNameEmpty || this.isPhoneNumberEmpty || this.minPhoneNumber || this.maxPhoneNumber) {
        this.anchoringToErrorField()
        return false
      }

      // if input field valid
      const query: any = this.$route.query
      const kantormu = this.$cookies.get('kantormu')

      const params = {
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: `${this.countryCode}${this.phoneNumber.replace(/^(0|62)/, '')}`, // trim leading 0 and 62
        email: this.email,
        encryptionDate: encodeURIComponent(query?.code),
        qrcType: query?.qrcType,
      }

      if (kantormu) {
        try {
          await this.$store.dispatch('qrcode/submitForm', params).then((response: any) => {
            if (response.data.code === 200) {
              /* GTM tracker */
              eventTracker('qrcformMembership')
              this.$router.push(`/qrcode/onboarding?code=${query?.code}`)
            }
          })
        } catch (error: any) {}
      }
    },
    goToHotline() {
      /* GTM tracker */
      eventTracker('qrcformHotline')
    },
    async codeValidation() {
      this.loadingValidate = true
      const query: any = this.$route.query
      const code = encodeURIComponent(query?.code)
      await this.$store.dispatch('qrcode/qrcodeValidation', { code }).then((response: any) => {
        const data = response.data
        if (data.code === 200) {
          this.loadingValidate = false
          const statusMembership = data.data.isMembershipQrc
          if (statusMembership) {
            this.$router.push(`/qrcode/onboarding?status=alreadyRegistered`)
          }
        }
      })
    },
  },
})
