import Vue from 'vue'

export default Vue.extend({
  computed: {
    // ...mapGetters({ remainingTime: 'kompasAuth/getRemainingTime' }),
    remainingTime() {
      return this.$store.state.kompasAuth.timer
    },
    warningIndicator() {
      return this.$store.state.kompasAuth.warningIndicator
    },
    authBlocked() {
      return this.$store.state.kompasAuth.authBlocked
    },
  },
  // timer updated each seconds
  watch: {
    remainingTime() {
      this.countdownTimer()
    },
  },
  methods: {
    // format time into mm:ss
    formatTime() {
      if (this.remainingTime >= 60) {
        if (this.remainingTime % 60 < 10) {
          return Math.floor(this.remainingTime / 60) + ':' + (this.remainingTime % 60 ? '0' + (this.remainingTime % 60) : '00') + ' menit'
        } else {
          return Math.floor(this.remainingTime / 60) + ':' + (this.remainingTime % 60 ? this.remainingTime % 60 : '00') + ' menit'
        }
      } else if (this.remainingTime < 10) {
        return '00' + ':' + (this.remainingTime % 60 ? '0' + (this.remainingTime % 60) : '00') + ' detik'
      } else {
        return '00' + ':' + (this.remainingTime % 60 ? this.remainingTime % 60 : '00') + ' detik'
      }
    },
    countdownTimer() {
      if (this.remainingTime > 0) {
        setTimeout(() => {
          this.$store.dispatch('kompasAuth/decreaseTimer')
        }, 1000)
      } else {
        // hide warning after countdown finish //
        this.$store.dispatch('kompasAuth/setIndicator', 0)
        this.$store.dispatch('kompasAuth/setAuthBlocked', false)
        this.$store.dispatch('kompasAuth/setLoginBlocked', false)
      }
    },
  },
})
