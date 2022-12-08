import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { capitalizeAllFirstCharacter, validateEmptyValue } from '~/components/utils/helper/stringManipulation'
export default Vue.extend({
  data: () => ({
    dataLoaded: false,
    userVerified: null,
    firstName: '',
    lastName: '',
  }),
  computed: {
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
    userMembership() {
      return this.$store.state.kelolaAkun.userMembership
    },
    userYear() {
      return this.$store.state.kelolaAkun.userYear
    },
  },
  watch: {
    userMembership() {
      this.setUserName()
      this.setDataLoaded()
    },
  },
  mounted() {
    this.setUserName()
    this.setDataLoaded()
    this.userVerified = this.$cookies.get('kompas._status')?.isVerified
  },
  methods: {
    setUserName() {
      this.firstName = validateEmptyValue(this.firstName) ? '' : capitalizeAllFirstCharacter(this.userMembership?.firstName)
      this.lastName = validateEmptyValue(this.lastName) ? '' : capitalizeAllFirstCharacter(this.userMembership?.lastName)
    },
    // check if computed data is loaded?
    setDataLoaded() {
      if (this.userMembership.hasOwnProperty('firstName')) {
        this.dataLoaded = true
      }
    },
    editProfile() {
      // ACTIVATE AGAIN ON 12 SEPT 2021
      // if (this.userVerified === true) {
      //   eventTracker('myAccountChange')
      //   this.$router.push({ path: '/manage-account/account-detail/personal-data' })
      //   setTimeout(() => {
      //     this.$router.push({ path: '/manage-account/account-detail/personal-data/edit' })
      //   }, 500)
      // }
      eventTracker('myAccountChange')
      this.$router.push({ path: '/manage-account/account-detail/personal-data/edit' })
    },
    capitalizeUsername(value: string) {
      return capitalizeAllFirstCharacter(value)
    },
  },
})
