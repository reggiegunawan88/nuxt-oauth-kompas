import Vue from 'vue'
import { validateEmptyValue } from '~/components/utils/helper/stringManipulation'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  data: () => ({
    // pass value
    currentPassword: '',
    confirmPassword: '',

    // show hide pass
    showCurrentPassword: false,
    showConfirmationPassword: false,

    // field validation
    currentPassEmpty: false,
    confirmationPassEmpty: false,

    // error msg boolean
    invalidCurrentPassword: false,
    invalidNewPassword: false,
    invalidConfirmationPassword: false,
    socialLogin: false,
  }),
  computed: {
    modalStatus() {
      const status = this.$store.state.modal.modalChangePassword === true
      return status
    },
    inputData() {
      return `${this.currentPassword}|${this.$store.getters['password/getPasswordValue']}|${this.confirmPassword}`
    },
    statusCode() {
      return this.$store.state.kelolaAkun.password.statusCode
    },
    // is user in editing state?
    isEditing() {
      return this.$store.state.kelolaAkun.isEditing
    },
    isPasswordCanceled() {
      return this.$store.getters['password/isResetPasswordCanceled']
    },
  },
  watch: {
    modalStatus(val) {
      const body = document.body
      if (val === true) {
        body.classList.add('overflow-hidden')
      } else {
        body.classList.remove('overflow-hidden')
      }
    },
    // watch every data field update
    inputData() {
      this.$store.dispatch('kelolaAkun/isUserEditing', true)
    },
    confirmPassword(val) {
      if (val === this.$store.getters['password/getPasswordValue']) {
        this.invalidConfirmationPassword = false
      }
    },
    isPasswordCanceled(val) {
      if (val) {
        this.clearData()
      }
    },
  },
  beforeMount() {
    window.addEventListener('beforeunload', this.preventReload)
  },
  methods: {
    // prevent from page reload if user is editing
    preventReload(event: any) {
      if (!this.isEditing) return
      event.preventDefault()
      event.returnValue = ''
    },
    // fill password function
    fillCurrentPassword(): void {
      this.invalidCurrentPassword = false
      this.currentPassword.length > 0 ? (this.currentPassEmpty = false) : (this.currentPassEmpty = true)
    },
    fillConfirmPassword(): void {
      this.invalidConfirmationPassword = false
      this.confirmPassword.length > 0 ? (this.confirmationPassEmpty = false) : (this.confirmationPassEmpty = true)
    },
    // validate user data field and password score
    validateForm(): void {
      if (this.validateUserData()) {
        if (this.$store.getters['password/getPasswordScore'] > 1) {
          eventTracker('savePassword')
          this.changePassword()
        }
      }
    },
    // validate user data field (fill/empty)
    validateUserData(): boolean {
      this.currentPassEmpty = validateEmptyValue(this.currentPassword)
      this.confirmationPassEmpty = validateEmptyValue(this.confirmPassword)
      this.$store.dispatch('password/isPasswordEmpty', validateEmptyValue(this.$store.getters['password/getPasswordValue']))
      if (this.currentPassEmpty === true) {
        return false
      }
      if (this.$store.getters['password/isPasswordEmpty'] === true) {
        return false
      }
      return true
    },
    // change password CTA action
    async changePassword() {
      if (this.$store.getters['password/getPasswordValue'] === this.confirmPassword) {
        await this.$store.dispatch('kelolaAkun/changePassword', {
          current: this.currentPassword.trim(),
          new: this.$store.getters['password/getPasswordValue'].trim(),
        })

        // success -> show snackbar
        if (this.statusCode === 200) {
          this.$store.dispatch('modal/hideModalChangePassword')
          this.$store.dispatch('snackbar/showSnackbarSuccess', true)
          this.$store.dispatch('snackbar/setSnackbarDesc', 'Berhasil mengubah kata sandi Anda!')
          this.clearData()
        }

        /* any error occured? */
        // invalid current password
        if (this.statusCode === 401) {
          this.invalidCurrentPassword = true
        }
        // current and new password similar
        if (this.statusCode === 409) {
          this.invalidNewPassword = true
        }
        // cannot change password because login with social
        if (this.statusCode === 410) {
          this.socialLogin = true
        }
      } else {
        this.invalidConfirmationPassword = true
      }
    },
    // toggle modal popup if user is editing
    cancelEdit() {
      if (this.isEditing) {
        this.$store.dispatch('modal/hideModalChangePassword')
        this.$store.dispatch('modal/showModalConfirmation')
        this.$store.dispatch('modal/setModalTitle', 'kata sandi')
      } else {
        this.$store.dispatch('modal/hideModalChangePassword')
        this.clearData()
      }
    },
    clearData() {
      // clear all field
      this.currentPassword = ''
      this.showCurrentPassword = false
      this.currentPassEmpty = false
      this.invalidCurrentPassword = false

      this.confirmPassword = ''
      this.showConfirmationPassword = false
      this.confirmationPassEmpty = false
      this.invalidConfirmationPassword = false

      this.$store.dispatch('password/setPasswordValue', '')
      this.$store.dispatch('password/isPasswordEmpty', false)
      this.$store.dispatch('password/setPasswordScore', 0)
      this.invalidConfirmationPassword = false

      this.$store.dispatch('kelolaAkun/isUserEditing', false)

      window.removeEventListener('beforeunload', this.preventReload)
    },
  },
})
