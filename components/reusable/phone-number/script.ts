import Vue from 'vue'
import { validateEmptyValue, maxPhoneNumLength, minPhoneNumLength } from '~/components/utils/helper/stringManipulation'

export default Vue.extend({
  props: {
    phoneNumberValue: {
      type: String,
      default: '',
    },
    countryCodeValue: {
      type: String,
      default: '62',
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    maximumCharacter: {
      type: Number,
      default: 12,
    },
    debounce: {
      type: Number,
      default: 700,
    },
  },
  data() {
    return {
      countryCode: '62',
      phoneNumber: '',

      incorrectPhoneNumber: false,
      isPhoneNumberEmpty: false,
      maxPhoneNumber: false,
      minPhoneNumber: false,

      // Timeout for debounce custom event
      timeout: 0,
    }
  },
  mounted() {
    this.countryCode = this.countryCodeValue || '62'
    this.phoneNumber = this.phoneNumberValue
  },
  methods: {
    fillPhoneNum(data: any): void {
      const { value } = data.detail

      this.phoneNumber = value
      this.isPhoneNumberEmpty = validateEmptyValue(value)
      this.incorrectPhoneNumber = false
      this.maxPhoneNumber = maxPhoneNumLength(value)
      this.minPhoneNumber = minPhoneNumLength(value, 5)

      // check if phone number value is exist
      if (!this.isPhoneNumberEmpty) {
        if (this.detectOnlyNumber(value)) {
          this.incorrectPhoneNumber = false
        } else {
          this.incorrectPhoneNumber = true
          this.maxPhoneNumber = false
          this.minPhoneNumber = false
        }
      }
      this.triggerCustomEvent(data)
    },
    detectOnlyNumber(phone: string): boolean {
      const exp = /^\d+$/
      return exp.test(phone)
    },
    triggerCustomEvent(data: any): void {
      // Add Timeout based on debounce time to fix laggy experience when input to fast
      // Similar Issue: https://github.com/vuematerial/vue-material/issues/544
      if (this.timeout) {
        window.clearTimeout(this.timeout)
      }
      this.timeout = window.setTimeout(() => {
        this.$emit('valueChanged', this.reformatData(data))
      }, this.debounce)
    },
    reformatData(data: any): Object {
      const { code, value } = data.detail
      const isHasError = this.validatePhoneNumber()

      return { code, value: value.replace(/^(0|62)/, ''), isError: isHasError }
    },
    /** Validate if phone number has error
     *  @return Boolean
     *  false => no error
     *  true => error
     * */
    validatePhoneNumber(): boolean {
      return (this.isRequired ? validateEmptyValue(this.phoneNumber) : false) || minPhoneNumLength(this.phoneNumber, 5) || maxPhoneNumLength(this.phoneNumber)
    },
  },
})