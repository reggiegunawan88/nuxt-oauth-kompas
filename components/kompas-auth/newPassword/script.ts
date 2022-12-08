import Vue from 'vue'
import jwtDecode from 'jwt-decode'
import { validateEmptyValue } from '~/components/utils/helper/stringManipulation'

export default Vue.extend({
  computed: {
    getPasswordScore() {
      return this.$store.state.password.score
    },
    isPasswordEmpty() {
      return this.$store.state.password.isPasswordEmpty
    },
  },
  methods: {
    decodeJWT(): Object {
      const jwt: any = this.$route.query.token
      return jwtDecode(jwt)
    },
    async sendPassword() {
      // check password value and score
      this.$store.dispatch('password/isPasswordEmpty', validateEmptyValue(this.$store.getters['password/getPasswordValue']))
      const jwt: any = this.decodeJWT()
      // Check if password is empty
      if (this.getPasswordScore >= 3) {
        try {
          // axios to API - send pass
          await this.$axios
            .put('/api/v1/users/password/new', {
              email: jwt.data.email,
              password: this.$store.getters['password/getPasswordValue'].trim(),
            })
            .then(() => {
              this.$store.dispatch('snackbar/showSnackbarSuccess', true)
              this.$store.dispatch('snackbar/setSnackbarDesc', 'Kata Sandi Berhasil Diubah.')
              this.$router.push('/login')
            })
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
})
