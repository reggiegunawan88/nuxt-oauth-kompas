import Vue from 'vue'
import { validateEntryPointUrl, validateQueryParams } from '~/components/utils/helper/general'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  head: {
    title: 'Halaman Daftar Akun Kompas.id - Harian Kompas',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Daftar akun Kompas.id untuk mendapatkan berita lengkap dan tepercaya khas Harian Kompas.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'daftar akun kompas, halaman sign up, harian kompas, kompas, langganan kompas, koran kompas, buat akun',
      },
    ],
  },
  auth: false,
  mounted() {
    this.validateEntryPoint()
  },
  methods: {
    validateEntryPoint() {
      const query = this.$route.query
      let next: any = this.$route.query.next
      // exclude param next
      const params = validateQueryParams(query, 'next')
      const qs = require('querystring')

      // check next with params
      if (Object.keys(params).length !== 0) {
        next = `${next}&${qs.stringify(params)}`
      }

      if ((next && !next.includes('qrcode')) || !next) {
        // remove prev url on page load
        this.$auth.$storage.removeUniversal('prevUrl')
        // validate and set entry point
        const prevUrl = validateEntryPointUrl(next, this.$config)
        this.$auth.$storage.setUniversal('prevUrl', prevUrl)
      }

      if (next && next.includes('qrcode')) {
        eventTracker('qrcregisterPageview')
      }
    },
  },
})
