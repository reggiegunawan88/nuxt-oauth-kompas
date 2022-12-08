import Vue from 'vue'
import { convertUNIXDate } from '~/components/utils/helper/date'

export default Vue.extend({
  data() {
    return {
      deviceList: [],
      activeDeviceKey: '',
    }
  },
  computed: {
    // get devices list value from Vuex
    userDevices() {
      return this.$store.state.kelolaAkun.userDevices
    },
  },
  watch: {
    userDevices() {
      // update device list after Vuex updated
      this.deviceList = this.userDevices
    },
  },
  mounted() {
    // set key value from kompas._status
    this.activeDeviceKey = this.$cookies.get('kompas._status').deviceKeyId
    this.deviceList = this.userDevices
  },
  methods: {
    ellipsisText(name: string) {
      // str length max 30
      return name.length >= 30 ? name.substring(0, 28) + '...' : name
    },
    convertTimestamp(unix: string) {
      return convertUNIXDate(unix)
    },
    revokeDevice(device: any) {
      this.$store.dispatch('modal/showModalDevice')
      this.$store.dispatch('modal/revokeAllDevice', false)
      this.$store.dispatch('modal/setModalTitle', 'Keluar Perangkat')
      // different modal wording for mobile native device
      if (device.device.toLowerCase().includes('native')) {
        this.$store.dispatch('modal/isNativeDevice', true)
        this.$store.dispatch('modal/setModalDescription', 'Jika Anda keluar dari aplikasi Kompas.id, seluruh data Anda seperti ePaper, Buku, dan pengaturan fitur akan terhapus.')
      } else {
        this.$store.dispatch('modal/isNativeDevice', false)
        this.$store.dispatch('modal/setModalDescription', 'Anda yakin untuk keluar dari Kompas.id di perangkat')
      }
      this.$store.dispatch('modal/setDeviceName', device.device)
      this.$store.dispatch('modal/setDeviceKeyID', device.key)
    },
    revokeAllDevices() {
      this.$store.dispatch('modal/showModalDevice')
      this.$store.dispatch('modal/revokeAllDevice', true)
      this.$store.dispatch('modal/setModalTitle', 'Keluar Di Semua Perangkat')
      this.$store.dispatch('modal/setModalDescription', 'Jika keluar ketika perangkat Anda masih memiliki sesi aktif, seluruh data Anda seperti ePaper dan pengaturan fitur akan terhapus.')
    },
  },
})
