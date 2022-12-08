import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      showDropdown: false,
      currentMenu: '',
      currentIcon: 'user',
    }
  },
  computed: {
    notificationCount() {
      return this.$store.state.kelolaAkun.userNotification.count
    },
    notificationLoading() {
      return this.$store.state.kelolaAkun.userNotification.isLoading
    },
  },
  watch: {
    // watch: update current menu every url route change
    $route() {
      this.updateNavMenu()
    },
  },
  mounted() {
    this.updateNavMenu()
  },
  updated() {
    this.updateNavMenu()
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    showPersonalData() {
      this.$router.push('/manage-account/account-detail/personal-data')
    },
    updateNavMenu() {
      const routeName = this.$route.name
      if (routeName?.includes('my-account')) {
        this.currentMenu = 'Akun Saya'
        this.currentIcon = 'user'
      }
      if (routeName?.includes('account-detail')) {
        this.currentMenu = 'Detail Akun'
        this.currentIcon = 'address-card'
      }
      if (routeName?.includes('activity')) {
        this.currentMenu = 'Aktivitas'
        this.currentIcon = 'running'
      }
      if (routeName?.includes('access-right')) {
        this.currentMenu = 'Hak Akses'
        this.currentIcon = 'user-lock'
      }
      if (routeName?.includes('reader-achievement')) {
        this.currentMenu = 'Pencapaian Pembaca'
        this.currentIcon = 'user-lock'
      }
      if (routeName?.includes('notification')) {
        this.currentMenu = 'Notifikasi'
        this.currentIcon = 'bell'
      }
      if (routeName?.includes('subscription-information')) {
        this.currentMenu = 'Informasi Berlangganan'
        this.currentIcon = 'newspaper'
      }
      if (routeName?.includes('transaction')) {
        this.currentMenu = 'Transaksi'
        this.currentIcon = 'exchange-alt'
      }
      if (routeName?.includes('ticket')) {
        this.currentMenu = 'Tiket'
        this.currentIcon = 'ticket-alt'
      }
    },
  },
})
