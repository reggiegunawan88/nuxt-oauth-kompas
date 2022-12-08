import Vue from 'vue'

export default Vue.extend({
  props: {
    listMenu: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {},
})
