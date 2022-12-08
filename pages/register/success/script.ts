import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      prevUrl: '',
      timer: 5,
    }
  },
  watch: {
    timer(oldVal, newVal) {
      if (oldVal !== newVal) {
        this.countdownTimer()
      }
    }
  },
  mounted() {
    this.countdownTimer()
  },
  methods: {
    countdownTimer() {
      if (this.timer > 0) {
        setTimeout(() => {
          this.timer--
        }, 1000)
      } else if (this.timer === 0) {
        // redirect to entry point
        window.location.href = this.$auth.$storage.getUniversal('prevUrl')
      }
    },
    redirectPage() {
      window.location.href = this.$auth.$storage.getUniversal('prevUrl')
    },
  },
})
