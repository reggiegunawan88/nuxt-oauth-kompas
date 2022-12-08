import Vue from 'vue'
import { validateEntryPointUrl } from '~/components/utils/helper/general'
export default Vue.extend({
  data() {
    return {
      // show page after register with socmed
      // redirectSocial: null as any, // TEMPORARY TAKEDOWN
      prevUrl: '',
      errorCode: null,
    }
  },
  computed: {
    userJustCreated() {
      return this.$store.state.kompasAuth.userJustCreated
    },
  },
  mounted() {
    // init prev url if any
    this.prevUrl = this.$auth.$storage.getUniversal('prevUrl')
    this.validateToken()
  },
  methods: {
    async validateToken() {
      const prevUrl = this.checkPrevUrl()
      const queryParams = window.location.hash.substr(1).split('=')[0] // first value from hash query
      // first hash is 'state' = google login
      if (queryParams === 'state') {
        const state = window.location.hash.substr(7).split('&')[0] // split hash params
        const token = window.location.hash.split('&')[1].substr(13) // split hash params
        try {
          await this.$store.dispatch('kompasAuth/GoogleAuth', { state, token, prevUrl })
        } catch (error: any) {
          this.errorCode = error.response.status
        }
      }
      // first hash is 'accessToken' = fb login
      if (queryParams === 'access_token' || queryParams === 'accessToken') {
        // will change later
        const token = window.location.hash.substr(14).split('&')[0] // split hash params
        try {
          await this.$store.dispatch('kompasAuth/FBAuth', { token, prevUrl })
        } catch (error: any) {
          this.errorCode = error.response.status
        }
      }
      // apple sign in send query params, not hash params
      if (this.$route.query.appleToken) {
        const token = this.$route.query.appleToken.toString()
        try {
          await this.$store.dispatch('kompasAuth/AppleAuth', { token, prevUrl })
        } catch (error: any) {
          this.errorCode = error.response.status
        }
      }

      // catch error code from response
      if (this.errorCode === 412) {
        // redirect to entry point
        if (prevUrl.includes('qrcode')) {
          window.location.href = `/device-list?next=${prevUrl}&qrcType=login`
        } else {
          window.location.href = `/device-list?next=${prevUrl}`
        }
        return
      }

      // redirect to entry point
      if (prevUrl.includes('qrcode')) {
        window.location.href = `${prevUrl}&qrcType=login`
      } else {
        window.location.href = prevUrl
      }

      // TEMPORARY TAKEDOWN
      // define either redirecting page after socmed login / register
      // if (this.userJustCreated) {
      //   // show page after socmed register and delete session after it
      //   this.redirectSocial = true
      //   sessionStorage.clear()
      // } else {
      //   // redirect entry point after socmed LOGIN (without isVerified=false)
      //   window.location.href = prevUrl
      // }
    },
    redirectPage() {
      window.location.href = this.prevUrl
    },
    // handle if prevUrl value is null
    checkPrevUrl() {
      const url = this.prevUrl
      if (url === null) {
        return validateEntryPointUrl(null, this.$config)
      } else {
        return url
      }
    },
  },
})
