import Vue from 'vue'

export default Vue.extend({
  methods: {
    redirectPage() {
      // redirect to entry point
      window.location.href = this.$auth.$storage.getUniversal('prevUrl')
    },
  },
})
