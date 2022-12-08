import Vue from 'vue'
import jwtDecode from 'jwt-decode'

export default Vue.extend({
  created() {
    // check if JWT is expired
    const jwt = this.$route.query.token
    this.$store.dispatch('kompasAuth/validateJWT', jwt)
  },
  methods: {
    decodeJWT(): Object {
      const jwt: any = this.$route.query.token
      return jwtDecode(jwt)
    },
    // resend email if url is expired
    async resendEmailResetPassword() {
      const jwt: any = this.decodeJWT()
      try {
        await this.$axios
          .$post('/api/v1/users/password/reset', {
            email: jwt.data.email,
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
      }
    },
  },
})
