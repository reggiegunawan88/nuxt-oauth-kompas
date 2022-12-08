import Vue from 'vue'
export default Vue.extend({
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('snackbar/showSnackbarAchievement', true)
      this.$store.dispatch('snackbar/setSnackbarAchievementIcon', require('@/assets/kelola-akun/badges-icon/international-warga-global.svg'))
      this.$store.dispatch('snackbar/setSnackbarAchievementTitle', 'Selamat, Anda Mendapatkan Medali [Nama Medali]')
      this.$store.dispatch('snackbar/setSnackbarAchievementDesc', 'Yuk, mulai baca artikel dari rubrik lain untuk mendapatkan medali lainnya.')
    }, 100)
  },
})
