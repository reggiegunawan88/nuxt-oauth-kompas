import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      loginStatus: false,
      showDropdown: false,

      /* data below send as props */
      userMembership: [] as any,
      notifications: 0,

      // label
      initialName: '',
    }
  },
  watch: {
    $route() {
      this.checkLoginStatus()
    },
  },
  mounted() {
    this.checkLoginStatus()
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    hideDropdownBlur() {
      setTimeout(() => {
        this.showDropdown = false
      }, 100)
    },
    checkLoginStatus() {
      const kantormu = this.$cookies.get('kantormu')
      const kompasToken = this.$cookies.get('kompas._token')
      if (kantormu && kompasToken) {
        // check user guid
        if (kantormu?.user.guid) {
          this.loginStatus = true
          // consume API
          this.getUserMembership()
          this.getNotificationsCount()
        }
      } else {
        this.loginStatus = false
      }
    },
    // notifications count
    getNotificationsCount() {
      this.$axios
        .get('https://api.kompas.cloud/account/api/v1/users/notification/count', {
          headers: { Authorization: `Bearer ${this.$cookies.get('kompas._token')}` },
        })
        .then((response) => {
          this.notifications = response.data.data.total
        })
    },
    // get user membership
    getUserMembership() {
      this.$axios
        .get('https://api.kompas.cloud/account/api/v1/users/membership', {
          headers: { Authorization: `Bearer ${this.$cookies.get('kompas._token')}` },
        })
        .then((response) => {
          this.userMembership = response.data.data.result.user
          this.initialName = this.userMembership.firstName?.charAt(0)
        })
    },
  },
})
