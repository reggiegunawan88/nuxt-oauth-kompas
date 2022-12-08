import Vue from 'vue'
import { maxPhoneNumLength, minPhoneNumLength } from '~/components/utils/helper/stringManipulation'
import listCountryCode from '~/assets/scripts/constants/countryCode.json'
import { deleteCookiesOnboarding } from '~/components/utils/helper/general'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  data() {
    return {
      /* country code id */
      countryCode: '+62',
      list: [] as any,

      phoneNumber: '',
      maxPhoneNumber: false,
      minPhoneNumber: false,
      phoneNumberIncorrect: false,
      whatsappInvalid: false,
      connError: false,

      // loading spinner
      isLoading: false,

      // error timer
      timer: 0,
    }
  },
  watch: {
    timer() {
      this.countdownTimer()
    },
  },
  mounted() {
    this.list = listCountryCode
  },
  methods: {
    fillPhoneNum(value: string) {
      this.phoneNumber = value
      this.phoneNumberIncorrect = false
      this.whatsappInvalid = false
      this.maxPhoneNumber = maxPhoneNumLength(this.phoneNumber)
      this.minPhoneNumber = minPhoneNumLength(this.phoneNumber)

      // check if phone number value is exist
      if (value.length > 0) {
        // check if string contains only char [0-9]
        if (/^\d+$/.test(this.phoneNumber)) {
          this.phoneNumberIncorrect = false
        } else {
          this.phoneNumberIncorrect = true
          this.maxPhoneNumber = false
          this.minPhoneNumber = false
        }
      }
    },
    chooseCountryCode(value: string) {
      this.countryCode = value
    },
    countdownTimer() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer--
        }, 1000)
      } else {
        this.connError = false
        this.whatsappInvalid = false
        this.timer = 0
      }
    },
    async submitPhoneNum() {
      eventTracker('clickSendLink')
      let isSubber = false
      // add conditional for cookie
      if (this.$cookies.get('kompas._isOnboarding') !== undefined) {
        isSubber = true
      }

      const payloadData = {
        countryCode: this.countryCode.replace('+', ''),
        phoneNumber: this.phoneNumber.replace(/^0+/, ''),
        isSubber,
        isOnboarding: true,
      }

      /* activate loading spinner */
      this.isLoading = true
      try {
        await this.$store.dispatch('onboarding/sendWhatsappMsg', payloadData).then(() => {
          eventTracker('successSendWaLink')
          const nextUrl = this.$route.query.track_content as string
          deleteCookiesOnboarding(this.$cookies, this.$config, this.$router, nextUrl)
        })
      } catch (error: any) {
        eventTracker('failedSendWaLink')
        const errCode = error.response.status
        const errResp = error.response.data

        // 422 -> connection error
        if (errCode === 403) {
          this.connError = true
          this.timer = errResp.data.timeRemaining
          this.$store.dispatch('snackbar/showSnackbarError')
          this.$store.dispatch('snackbar/setSnackbarErrorDesc', 'Tautan gagal dikirim. Silakan periksa koneksi internet Anda & coba lagi.')
        }

        // 403 -> whatsapp num invalid
        if (errCode === 422) {
          this.whatsappInvalid = true
          this.timer = errResp.data.timeRemaining
        }
      } finally {
        this.isLoading = false
      }
    },
  },
})
