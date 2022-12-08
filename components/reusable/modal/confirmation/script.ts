import Vue from 'vue'
import { capitalizeFirstCharacter } from '~/components/utils/helper/stringManipulation'
export default Vue.extend({
  methods: {
    // delete soon?
    capitalizedDescription() {
      return capitalizeFirstCharacter(this.$store.state.modal.modalTitle)
    },
    abort() {
      // route to prev page and hide modal
      if (this.$route.path.includes('reset-password')) {
        this.$store.dispatch('kelolaAkun/isUserEditing', false)
        this.$router.go(0)
      } else if (this.$route.path.includes('account-security')) {
        this.$store.dispatch('kelolaAkun/isUserEditing', false)
        this.$store.dispatch('password/isResetPasswordCanceled', true)
      } else {
        this.$store.dispatch('kelolaAkun/isUserEditing', false)
        this.$router.go(-1)
      }
      this.$store.dispatch('modal/hideModalConfirmation')
    },
    isCancel() {
      if (this.$route.path.includes('account-security')) {
        this.$store.dispatch('modal/hideModalConfirmation')
        this.$store.dispatch('modal/showModalChangePassword')
        this.$store.dispatch('password/isResetPasswordCanceled', false)
      } else {
        this.$store.dispatch('modal/hideModalConfirmation')
      }
    },
  },
})
