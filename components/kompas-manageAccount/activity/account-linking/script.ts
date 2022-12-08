import Vue from 'vue'
import { reformedDateWithTime } from '~/components/utils/helper/date'
export default Vue.extend({
  data() {
    return {
      dataLoaded: false,
      activeAccordion: null as any,
      showTooltip: false,
    }
  },
  computed: {
    ssoList() {
      return this.$store.state.sso.ssoList
    },
  },
  watch: {
    ssoList() {
      this.dataLoaded = true
    },
  },
  mounted() {
    if (this.ssoList.length > 0) {
      this.dataLoaded = true
    }
  },
  methods: {
    openAccordion(index: number) {
      this.activeAccordion = this.activeAccordion === index ? null : index
    },
    toggleTooltip() {
      this.showTooltip = !this.showTooltip
    },
    // return formatted time for sso timestamp
    formatTime(value: string) {
      return reformedDateWithTime(value)
    },
    revoke(sso: any) {
      this.$store.dispatch('modal/showModalSSO')
      // send client id
      this.$store.dispatch('modal/setClientID', sso.oauthClientId)
    },
  },
})
