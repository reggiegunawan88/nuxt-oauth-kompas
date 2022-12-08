import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      jwt: '' as any,
      tokenValid: null,
    }
  },
  async mounted() {
    this.jwt = this.$route.query.token
    await this.checkJWT()
  },
  methods: {
    async cancelRegister() {
      const jwt: any = this.$route.query.token
      await this.$store.dispatch('kompasAuth/cancelRegister', jwt)
      this.$router.push('/login')
    },
    checkJWT() {
      this.$store.dispatch('kompasAuth/validateJWT', this.jwt)
    },
  },
})
