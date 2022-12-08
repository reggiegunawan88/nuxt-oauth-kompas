import Vue from 'vue'
import { validateEmptyValue } from '~/components/utils/helper/stringManipulation'
import { getDeviceName, getDeviceType } from '~/components/utils/helper/device'
import { anchoringErrorField } from '~/components/utils/helper/anchoring'
// 3rd party script GTM
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  data() {
    return {
      password: '',
      showPassword: false,
      isPasswordEmpty: false,
      checkbox: null,
      showSpinner: false,

      // login error msg
      incorrectPassword: false,
      errorLoginMsg: '',

      /* 0 -> login success
         1 -> last attempt before 5th login
         2 -> 5th login attempt
         3 -> permanent block
      */
      warningIndicator: 0,
    }
  },
  computed: {
    emailValue() {
      return this.$store.state.otp.emailValue
    },
  },
  mounted() {
    this.autoFillData()
  },
  methods: {
    changeEmail() {
      this.$store.dispatch('kompasAuth/changeEmail')

      // set login warning to default state
      this.warningIndicator = 0
      this.$store.dispatch('kompasAuth/setIndicator', this.warningIndicator)
      this.$store.dispatch('kompasAuth/setLoginBlocked', false)
    },
    forgotPass() {
      eventTracker('forgotPassword')
    },
    autoFillData() {
      // check logjn data to storage
      const logindata = this.$auth.$storage.getLocalStorage('loginData')
      if (logindata) {
        this.password = logindata.password
        this.checkbox = logindata.ingatSaya
      }
    },
    validateForm(): void {
      // pass is empty?
      this.incorrectPassword = false
      this.isPasswordEmpty = validateEmptyValue(this.password)
      if (this.anchoringToErrorField()) {
        this.loginUser()
        eventTracker('loginEmail')
      }
    },
    fillPassword(value: string): void {
      // set boolean error indicator to default value
      this.incorrectPassword = false

      this.password = value
      if (this.password.length > 0) {
        this.isPasswordEmpty = false
      } else {
        this.isPasswordEmpty = true
      }
    },
    validateCheckbox(value: any) {
      this.checkbox = value
    },
    redirectPage(response: any) {
      window.location.href = response.data.data.docReferrer
    },
    async loginUser() {
      this.incorrectPassword = false
      this.$store.dispatch('kompasAuth/setLoginBlocked', false)

      /* set URL doc referrer */
      const authPrevurl = this.$auth.$storage.getUniversal('prevUrl')
      this.showSpinner = true
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.emailValue.toLowerCase(),
              password: this.password,
              docReferrer: authPrevurl,
              device: getDeviceName(),
              deviceType: getDeviceType(),
            },
          })
          .then(() => {
            eventTracker('loginSuccess')
            // remember user data into storage
            if (this.checkbox) {
              const userdata = {
                email: this.emailValue,
                password: this.password,
                ingatSaya: this.checkbox,
              }
              this.$auth.$storage.setLocalStorage('loginData', userdata)
            } else {
              this.$auth.$storage.removeLocalStorage('loginData')
            }

            // redirect to verify page / entry point page
            if (this.$auth.$storage.getUniversal('toVerifyPage') === true) {
              this.$router.push('/register/verify-success')
            } else {
              const next = this.$route.query.next
              const redirectUrl = this.$auth.$storage.getUniversal('prevUrl')
              if (next && next.includes('qrcode')) {
                eventTracker('qrcloginEmail')
                window.location.href = `${redirectUrl}&qrcType=login`
              } else {
                window.location.href = redirectUrl
              }
            }
          })
      } catch (e: any) {
        const errorCode = e.response.data.code

        // Redirect to "atur perangkat" page
        if (errorCode === 412) {
          window.location.href = `/device-list?next=${this.$auth.$storage.getUniversal('prevUrl')}`
          return
        }

        const indicator = e.response.data.data.failedCount
        if (e.response.data.data.loginBlocked) {
          this.incorrectPassword = false
          this.$store.dispatch('kompasAuth/setLoginBlocked', true)
          this.$store.dispatch('kompasAuth/setLoginBlockedMsg', e.response.data.message)

          // timer countdown before re-login
          this.$store.dispatch('kompasAuth/setTimer', e.response.data.data.timeRemaining)
        } else {
          // password invalid
          if (errorCode === 401) {
            this.incorrectPassword = true
          }
          // set warning bar based on login failed count
          if (indicator < 10) {
            this.warningIndicator = 0
            this.$store.dispatch('kompasAuth/setIndicator', this.warningIndicator)
          }
          if (indicator === 10) {
            // last chance before 5th login attempt
            this.warningIndicator = 1
            this.$store.dispatch('kompasAuth/setIndicator', this.warningIndicator)

            // scroll to notification bar
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          if (indicator > 10) {
            eventTracker('loginFailed')
            const timer = e.response.data.data.timeRemaining
            this.warningIndicator = 2
            this.$store.dispatch('kompasAuth/setIndicator', this.warningIndicator)
            this.$store.dispatch('kompasAuth/setTimer', timer)

            // scroll to notification bar
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      }
      this.showSpinner = false
    },
    anchoringToErrorField() {
      // list DOM elements
      const listElements = [
        {
          element: this.$refs.email,
          error: this.incorrectPassword,
        },
        {
          element: this.$refs.password,
          error: this.isPasswordEmpty,
        },
      ]
      return anchoringErrorField(listElements)
    },
  },
})
