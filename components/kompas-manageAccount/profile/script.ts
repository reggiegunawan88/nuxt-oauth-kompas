import Vue from 'vue'
import { capitalizeAllFirstCharacter, validateEmptyValue } from '~/components/utils/helper/stringManipulation'
export default Vue.extend({
  data: () => ({
    dataLoaded: false, // indicator data loaded from Vuex
    expire: '',
    firstName: '',
    lastName: '',
    isLangganan: false,
    isExpire: '',
    buttonExpired: '',
  }),
  computed: {
    userMembership() {
      return this.$store.state.kelolaAkun.userMembership
    },
    notificationCount() {
      return this.$store.state.kelolaAkun.userNotification.count
    },
    notificationLoading() {
      return this.$store.state.kelolaAkun.userNotification.isLoading
    },
  },
  watch: {
    userMembership() {
      this.setUserData()
      this.setDataLoaded()
    },
  },
  mounted() {
    this.setUserData()
    this.setDataLoaded()
  },
  methods: {
    // set data load indicator for skeleton loading
    // if dataLoaded true, replace skeleton with content
    setDataLoaded() {
      if (this.userMembership.hasOwnProperty('firstName')) {
        this.dataLoaded = true
      }
    },
    setUserData() {
      this.firstName = validateEmptyValue(this.userMembership?.firstName) ? '' : capitalizeAllFirstCharacter(this.userMembership?.firstName)
      this.lastName = validateEmptyValue(this.userMembership?.lastName) ? '' : capitalizeAllFirstCharacter(this.userMembership?.lastName)
      if (this.userMembership.updateMembership !== null) {
        this.isLangganan = false
        this.buttonExpired = this.userMembership.updateMembership?.label
        this.expire = this.userMembership.isActive
      } else {
        this.isLangganan = true
      }
      // check membership jika sudah berakhir akan menjadi orange warna textnya
      this.isExpire = this.userMembership?.expired?.includes('Berakhir')
    },
    goSubscribe() {
      window.location.href = 'https://www.kompas.id/berlangganan'
    },
  },
})
