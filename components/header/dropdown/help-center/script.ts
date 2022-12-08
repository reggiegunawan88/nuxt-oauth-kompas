import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      copySuccess: false,
    }
  },
  methods: {
    copyKompasKring() {
      const copyNumber: any = document.getElementById('kompasKring')?.innerHTML
      navigator.clipboard.writeText(copyNumber)
      this.copySuccess = true
      setTimeout(() => {
        this.copySuccess = false
      }, 2000)
    },
  },
})
