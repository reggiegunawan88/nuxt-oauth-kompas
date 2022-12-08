import Vue from 'vue'
import backtoTop from '~/components/reusable/backtoTop.vue'

export default Vue.extend({
  components: {
    backtoTop,
  },
  head: {
    title: 'Halaman Notifikasi Kompas.id - Harian Kompas',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Daftar notifikasi berisi informasi atau pemberitahuan tentang masa berlangganan dan akun Kompas.id Anda.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'akun kompas, harian kompas, kompas, notifikasi, kelola akun, pengaturan, setting account, langganan kompas',
      },
    ],
  },
})
