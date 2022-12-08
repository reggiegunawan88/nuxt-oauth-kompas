import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      email: '',
      google: false,
      facebook: false,
      apple: false,
    }
  },
  head: {
    title: 'Halaman Masuk Akun Kompas.id - Harian Kompas',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Masuk Kompas.id untuk mendapatkan berita lengkap dan tepercaya khas harian Kompas.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'masuk akun kompas, halaman login, harian kompas, kompas, langganan kompas, koran kompas, sign in',
      },
    ],
  },
  mounted() {
    this.checkSocialLoginStatus()
  },

  methods: {
    checkSocialLoginStatus() {
      this.email = this.$route.query.email as string
      const social = this.$route.query.social
      // validation conditional
      if (social.includes('google')) {
        this.google = true
      }
      if (social.includes('facebook')) {
        this.facebook = true
      }
      if (social.includes('apple')) {
        this.apple = true
      }
    },
  },
})
