import Vue from 'vue'

export default Vue.extend({
  layout: 'default',
  mounted() {
    this.hitAddNewSso()
  },
  methods: {
    async hitAddNewSso() {
      const query = this.$route.query
      const data = {
        client_id: 3,
        client_secret: 'iNQmb9TmM40TuEX88olXnSCciXgjuSF9o-Fhk28DFYk=',
        code: query.authorization_code,
        grant_type: 'authorization_code',
      }
      await this.$store.dispatch('sso/addNewSsoLinking', { ...data })
    }
  }
})
