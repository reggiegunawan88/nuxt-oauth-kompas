import Vue from 'vue'
export default Vue.extend({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
    // @ts-ignore
    // prevent change page while user editing data
    const isEditing = this.$store.state.kelolaAkun.isEditing
    // show dialog if user is editing and modal confirmation is opened
    if (isEditing && to.name !== 'manage-account-account-detail-personal-data') {
      if (window.confirm('Are you sure to leave page? Changes you made may not be saved.')) {
        this.$store.dispatch('kelolaAkun/isUserEditing', false)
        next()
      } else {
        return false
      }
    } else {
      next()
    }
  },
})
