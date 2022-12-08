import Vue from 'vue'
export default Vue.extend({
  mounted() {
    // this.getSubscriptionData()
  },
  methods: {
    getSubscriptionData() {
      const userGuid = this.$cookies.get('kantormu').user.guid
      const token = this.$cookies.get('kompas._token')
      this.$store.dispatch('kelolaAkun/getAPIMyData', { token, userGuid })
    },
  },
})
