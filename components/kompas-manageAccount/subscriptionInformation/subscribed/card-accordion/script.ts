import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      showAccordion: false,
    }
  },
  methods: {
    toggleAccordion() {
      this.showAccordion = !this.showAccordion
    },
  },
})
