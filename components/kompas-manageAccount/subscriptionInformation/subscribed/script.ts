import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    toggleModal() {
      this.$store.dispatch('modal/showModalAccessRight')
    },
  },
})
