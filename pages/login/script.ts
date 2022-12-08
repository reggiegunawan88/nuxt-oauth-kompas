import Vue from 'vue'
import { validateEntryPointUrl, validateQueryParams } from '~/components/utils/helper/general'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  middleware({ app, $config, redirect }) {
    // If the user is authenticated
    const kantormu = app.$cookies.get('kantormu')
    const refreshToken = app.$cookies.get('kompas._token_refresh')
    if (process.server) {
      if (kantormu && refreshToken) {
        redirect($config.redirect)
      }
    }
  },
  head: {
    title: 'Halaman Masuk Akun Kompas.id - Harian Kompas',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Masuk Kompas.id untuk mendapatkan berita lengkap dan tepercaya khas Harian Kompas.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'masuk akun kompas, halaman login, harian kompas, kompas, langganan kompas, koran kompas, sign in',
      },
    ],
  },
  computed: {
    loginByEmail() {
      return this.$store.state.kompasAuth.loginByEmail
    },
  },
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
        eventTracker('qrcloginPageview')
      }
    },
    gotToRegister() {
      this.$router.push({ path: `/register?next=${this.$auth.$storage.getUniversal('prevUrl')}` })
    },
  },
})
