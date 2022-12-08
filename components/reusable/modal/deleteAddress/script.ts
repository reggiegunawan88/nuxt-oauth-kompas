import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async deleteAddress() {
      const currentAddressId = this.$store.state.modal.addressId
      // add loading screen to wait until address is deleted
      this.loading = true
      await this.$store.dispatch('address/deleteUserAddress', currentAddressId).then(() => {
        // hide modal and show snackbar success
        this.$store.dispatch('address/getUserAddress')
        this.$store.dispatch('modal/hideModalDeleteAddress')
        // show snackbar
        this.$store.dispatch('snackbar/showSnackbarSuccess', true)
        this.$store.dispatch('snackbar/setSnackbarDesc', 'Alamat berhasil dihapus.')
      })
      this.loading = false
    },
  },
})
