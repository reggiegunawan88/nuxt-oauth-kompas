import Vue from 'vue'
export default Vue.extend({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRouteLeave(to, from, next) {
    // @ts-ignore
    const isEditing = this.$store.state.kelolaAkun.isEditing
    if (isEditing) {
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
