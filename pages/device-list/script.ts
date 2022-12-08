import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  auth: false,
  computed: {
    // get devices list value from Vuex
    userDevices() {
      return this.$store.state.kelolaAkun.userDevices
    },
  },
  watch: {
    userDevices(val) {
      if (val.length === 5) {
        eventTracker('deviceFull')
      }
    }
  },
  mounted() {
    this.consumeAPI()
  },
  methods: {
    // API consume needed for manage account page
    consumeAPI() {
      this.$store.dispatch('kelolaAkun/getUserDevices')
    },
  },
})
