import Vue from 'vue'
export default Vue.extend({
  computed: {
    modalStatus() {
      const status = this.$store.state.modal.modalOtpAddPhone === true
      return status
    },
  },
  watch: {
    modalStatus(val) {
      const body = document.body
      if (val === true) {
        body.classList.add('overflow-hidden')
      } else {
        body.classList.remove('overflow-hidden')
      }
    },
  },
})
