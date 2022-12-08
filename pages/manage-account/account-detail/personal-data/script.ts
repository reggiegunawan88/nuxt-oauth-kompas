import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  data() {
    return {
      userVerified: false,
    }
  },
  head: {
    title: 'Data Diri Akun Kompas.id - Harian Kompas',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Kelola informasi data diri akun Kompas.id untuk kenyamanan dalam penggunaan akun.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'akun kompas, harian kompas, kompas, langganan kompas, koran kompas, kelola akun, setting account, pengaturan, data diri, personal information',
      },
    ],
  },
  mounted() {
    this.userVerified = this.$cookies.get('kompas._status')?.isVerified
  },
  methods: {
    editData() {
      eventTracker('personaldataChange')
      this.$router.push({ path: '/manage-account/account-detail/personal-data/edit' })
    },
  },
})
