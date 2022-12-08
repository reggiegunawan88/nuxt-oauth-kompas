import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      maskedEmail: '',
    }
  },
  created() {
    this.maskedEmail = this.$route.query.email as string
  },
})
