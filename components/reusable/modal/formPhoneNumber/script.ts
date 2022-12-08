import Vue from 'vue'
import { storePhoneNum } from '~/components/utils/helper/device'
export default Vue.extend({
  data: () => ({
    loading: false,
    token: '',
    countryCode: '62',
    phoneNumber: '',
    isError: false,
  }),
  computed: {
    modalStatus() {
      const status = this.$store.state.modal.modalAddPhoneNumber === true || this.$store.state.modal.modalUpdatePhoneNumber === true
      return status
    },
  },
  watch: {
    modalStatus(val) {
      const body = document.body
      if (val === true) {
        body.classList.add('overflow-hidden')
      } else {
        body.classList.remove('overflow-hidden')
      }
    },
  },
  mounted() {
    this.token = this.$cookies.get('kompas._token')
  },
  methods: {
    // set phone num value based on child reusable component
    setPhoneNumber(e: any) {
      this.countryCode = e.code
      this.phoneNumber = e.value
      this.isError = e.isError
    },
    async submitPhoneNum() {
      if (!this.isError) {
        storePhoneNum(this.$auth.$storage, this.countryCode, this.phoneNumber)
        this.loading = true

        try {
          await this.$store.dispatch('otp/sendUpdatedPhoneNumber', { jwt: this.token, phoneNumber: this.phoneNumber, countryCode: this.countryCode, flag: 2, route: 'account-security' })

          this.$store.dispatch('modal/hideModalAddPhoneNumber')
          this.$store.dispatch('modal/hideModalUpdatePhoneNumber')
          this.$store.dispatch('modal/showModalOtpPhoneNumber')
        } catch (error: any) {
          const errorMessage = error.response.data.message
          this.$store.dispatch('snackbar/showSnackbarError', '', { root: true })
          this.$store.dispatch('snackbar/setSnackbarErrorDesc', errorMessage, { root: true })
          this.$store.dispatch('modal/hideModalAddPhoneNumber')
          this.$store.dispatch('modal/hideModalUpdatePhoneNumber')
        }
        this.loading = false
      }
    },
  },
})
