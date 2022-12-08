import Vue from 'vue'
export default Vue.extend({
  computed: {
    // State userAccess data
    accessData() {
      return this.$store.state.kelolaAkun.userAccess.data
    },
    // State userAccess isLoading
    userAccessLoading() {
      return this.$store.state.kelolaAkun.userAccess.isLoading
    },
  },
})
