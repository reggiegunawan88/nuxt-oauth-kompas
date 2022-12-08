import Vue from 'vue'
import { clearCookies } from '~/components/utils/helper/general'

export default Vue.extend({
  async middleware({ app, store, $config, redirect }) {
    // If the user is authenticated
    const refreshToken = app.$cookies.get('kompas._token_refresh')
    if (process.server) {
      if (refreshToken) {
        await store.dispatch('kompasAuth/setRefreshToken', refreshToken)
        app.$cookies.remove('kompas._token_refresh', { domain: $config.cookieDomain })
        app.$cookies.remove('kompas._status', { domain: $config.cookieDomain })
        app.$cookies.remove('kantormu', { domain: $config.cookieDomain })
      } else {
        redirect($config.homepageKompasAuth)
      }
    }
  },
  computed: {
    refreshToken() {
      return this.$store.state.kompasAuth.refreshToken
    },
  },
  mounted() {
    this.logout()
  },
  methods: {
    async logout() {
      // clear cookies and storage
      clearCookies(this.$cookies, this.$config)
      localStorage.clear()

      // clear query from revoke device
      const query: any = this.$route.query.clear || ''
      const isClear = query.toLowerCase()

      if (!isClear || isClear !== 'true') {
        // from the logout button
        await this.$store.dispatch('kompasAuth/logoutUser', this.refreshToken)
      } else {
        /*
          - from revoke device with query clear
          - set timeout to avoid client side errors
        */
        const deviceNameQuery: any = this.$route.query.device || ''
        const deviceName = deviceNameQuery.toLowerCase()
        setTimeout(() => {
          if (!deviceName) {
            this.$store.dispatch('snackbar/showSnackbarInfo', true)
            this.$store.dispatch('snackbar/setSnackbarInfoDesc', 'Anda sudah keluar dari akun Kompas.id di perangkat ini. Silakan masuk akun kembali.')
          } else {
            // revoke perangkat ini
            this.$store.dispatch('snackbar/showSnackbarSuccess', true)
            this.$store.dispatch('snackbar/setSnackbarDesc', 'Anda telah keluar dari perangkat ' + deviceName + '.')
          }
        }, 100)
      }
      this.$router.push('/login')
    },
  },
})