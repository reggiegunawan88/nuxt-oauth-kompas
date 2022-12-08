import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    // activate later if needed
    // revokeAllDevice() {
    //   return this.$store.state.modal.revokeAllDevice
    // },
    // boolean value -> is device x from native android/ios?
    isNativeDevice() {
      return this.$store.state.modal.isNativeDevice
    },
    // boolean value -> device x has been revoked by another user / no?
    deviceHasBeenRevoked() {
      return this.$store.state.kelolaAkun.deviceHasBeenRevoked
    },
  },
  methods: {
    async revoke() {
      const token = this.$cookies.get('kompas._token')
      const currentDeviceKey = this.$cookies.get('kompas._status').deviceKeyId
      const deviceName = this.$store.state.modal.deviceName
      const deviceKey = this.$store.state.modal.deviceKeyID
      let data: any = {
        key: deviceKey,
      }
      if (this.$route.path.includes('device-list')) {
        data = {
          key: deviceKey,
          isFullPage: true,
        }
      }
      /* revoke single device */
      try {
        await this.$store.dispatch('kelolaAkun/revokeSingleDevice', { token, data }).then((response) => {
          // revoke success
          this.$store.dispatch('kelolaAkun/deviceHasBeenRevoked', false)
          this.$store.dispatch('kelolaAkun/setRevokeDevices', response)
          this.revokeScenario(currentDeviceKey, deviceName, deviceKey)
        })
      } catch (error: any) {
        // revoke failed
        if (error.response.status === 401) {
          this.$store.dispatch('modal/hideModalDevice')
          const routeUrl = window.location.origin
          return (window.location.href = `${routeUrl}/logout`)
        } else {
          this.$store.dispatch('kelolaAkun/deviceHasBeenRevoked', false)
          this.revokeScenario(currentDeviceKey, deviceName, deviceKey)
        }
      }
    },

    async revokeScenario(currentDeviceKey: string, deviceName: string, deviceKey: string) {
      // device not exist / has been revoked
      if (this.deviceHasBeenRevoked) {
        // add loading screen to wait until device list is updated
        this.loading = true
        await this.$store.dispatch('kelolaAkun/getUserDevices').then(() => {
          // show snackbar info
          this.$store.dispatch('snackbar/showSnackbarInfo', true)
          this.$store.dispatch('snackbar/setSnackbarInfoDesc', 'Perangkat telah dikeluarkan. Silakan pilih keluar dari perangkat lainnya untuk masuk Kompas.id.')
        })
        this.loading = false
        this.$store.dispatch('modal/hideModalDevice')
        return false
      }
      // if device in list is current active device -> throw user to re-login
      if (currentDeviceKey === deviceKey) {
        this.$store.dispatch('modal/hideModalDevice')

        // clear storage when revoke ourself
        localStorage.clear()
        const routeUrl = window.location.origin
        window.location.href = `${routeUrl}/logout?clear=true&device=${deviceName}`
      } else {
        // hide modal device and show snackbar
        this.$store.dispatch('snackbar/showSnackbarInfo', false)
        this.$store.dispatch('modal/hideModalDevice')
        this.$store.dispatch('snackbar/showSnackbarSuccess', true)
        this.$store.dispatch('snackbar/setSnackbarDesc', 'Anda telah keluar dari perangkat ' + deviceName + '.')

        // redirect to homepage or next page (hanya di perangkat penuh)
        if (this.$route.path.includes('device-list')) {
          // add key login type into localstorage
          const isSocial = this.$store.state.kelolaAkun.revokeDevices.isSocial
          const isPassEmpty = this.$store.state.kelolaAkun.revokeDevices.isPassEmpty

          this.$storage.setLocalStorage('login_isSocial', isSocial)
          this.$storage.setLocalStorage('login_isPassEmpty', isPassEmpty)
          // tracker
          eventTracker('revokeFullDevice')

          const prevUrl = this.$auth.$storage.getUniversal('prevUrl')
          // redirect to entry point
          if (prevUrl.includes('qrcode')) {
            window.location.href = `${prevUrl}&qrcType=login`
          } else {
            window.location.href = prevUrl
          }
        } else {
          /* add loading screen to wait until device list is updated
           * hide this AJAX on full page device list
           */
          this.loading = true
          await this.$store.dispatch('kelolaAkun/getUserDevices')
          this.loading = false
          // tracker
          eventTracker('revokeDevice')
        }
      }
    },

    // activate later if needed
    async revokeAllDevice(token: any) {
      this.loading = true
      await this.$store.dispatch('kelolaAkun/revokeAllDevices', { token })
      this.$store.dispatch('modal/hideModalDevice')
      this.$store.dispatch('snackbar/showSnackbarSuccess', true)
      this.$store.dispatch('snackbar/setSnackbarDesc', 'Anda telah keluar dari semua perangkat.')
      this.$router.push('/login')
    },
  },
})
