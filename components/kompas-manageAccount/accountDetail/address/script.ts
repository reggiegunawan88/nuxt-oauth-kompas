import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { capitalizeFirstCharacter } from '~/components/utils/helper/stringManipulation'
export default Vue.extend({
  computed: {
    userAddress() {
      return this.$store.state.address.userAddress
    },
    daftarProvinsi() {
      return this.$store.state.kelolaAkun.provinceList
    },
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    addNewAddress() {
      // check if user address is null or user address length < 5
      if (this.userAddress === null || this.userAddress.length < 5) {
        eventTracker('fillAddress')
        this.$router.push('/manage-account/account-detail/address/new')
      } else {
        eventTracker('addressFull')
        // if user address length = 5, show error snackbar
        this.$store.dispatch('snackbar/showSnackbarError')
        this.$store.dispatch('snackbar/setSnackbarErrorTitle', 'Daftar Alamat Penuh.')
        this.$store.dispatch('snackbar/setSnackbarErrorDesc', 'Ubah atau hapus salah satu untuk menambah alamat baru.')
        this.$store.dispatch('snackbar/showSnackbarSuccess', false) // hide snackbar to avoid snackbar stacking (if any snackbar success)
      }
    },
    updateAddress(address: any, id: string) {
      eventTracker('editAddress')
      this.$router.push({ path: '/manage-account/account-detail/address/edit', query: { addressId: id } })
      this.$store.dispatch('address/setUpdatedAddress', address)
    },
    async setMainAddress(addressId: string) {
      await this.$store.dispatch('address/setMainAddress', addressId).then(() => {
        eventTracker('setMainAddress')
        // show snackbar
        this.$store.dispatch('address/getUserAddress')
        this.$store.dispatch('snackbar/showSnackbarSuccess', true)
        this.$store.dispatch('snackbar/setSnackbarDesc', 'Alamat berhasil dijadikan alamat utama.')
      })
    },
    deleteAddress(addressId: string) {
      eventTracker('removeAddress')
      this.$store.dispatch('modal/setAddressId', addressId)
      this.$store.dispatch('modal/showModalDeleteAddress')
    },
    capitalizedName(value: string) {
      return value
        .toLowerCase()
        .split(' ')
        .map((word) => capitalizeFirstCharacter(word))
        .join(' ')
    },
  },
})
