import Vue from 'vue'
import { getMembershipTypeCode } from '~/components/utils/helper/general'
export default Vue.extend({
  middleware: 'setToken',
  auth: false,
  computed: {
    // get member type
    memberIsActive() {
      return this.$store.state.kelolaAkun.userMembership.isActive
    },
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
  },
  watch: {
    // change member type to code for API needs
    memberIsActive(val) {
      const codeConvert = val.replace(/ /g, '_').toLowerCase()
      const params = {
        typeAccess: getMembershipTypeCode(codeConvert),
      }

      if (val) {
        this.getUserAccessData(params)
      }
    },
    userData: {
      handler(_oldVal, newVal) {
        if (newVal !== null || newVal.length) {
          this.consumeAnotherApi()
        }
      },
    },
  },
  mounted() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      this.consumeAPI()
    },
    // API consume needed for manage account page
    consumeAPI() {
      this.$store.dispatch('kelolaAkun/getUserData')
    },
    consumeAnotherApi() {
      this.$store.dispatch('kelolaAkun/getMembership')
      this.$store.dispatch('kelolaAkun/getUserDevices')
      this.$store.dispatch('kelolaAkun/getAllCountry')
      this.$store.dispatch('kelolaAkun/getAllProvince')
      // this.$store.dispatch('address/getUserAddress') //activate later until address v2.0 released
      this.$store.dispatch('kelolaAkun/getUserNotification')
      this.$store.dispatch('sso/getSSOList')
      this.$store.dispatch('myProduct/getListEventTicket', { sort: 'all', next: '' })
      this.$store.dispatch('transaction/getListTransaction')
    },
    async getUserAccessData(params: any) {
      await this.$store.dispatch('kelolaAkun/getUserAccess', params)
    },
  },
})
