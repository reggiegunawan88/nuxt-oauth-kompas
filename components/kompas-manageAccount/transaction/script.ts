import Vue from 'vue'
export default Vue.extend({
  computed: {
    listTransaction() {
      return this.$store.state.transaction.transactionList.data
    },
    isLoading() {
      return this.$store.state.transaction.transactionList.isLoading
    },
  },
})
