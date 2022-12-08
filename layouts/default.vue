<template>
  <div class="relative min-h-screen">
    <Header />
    <!-- snackbar section top of the page -->
    <reusable-snackbar-send-link />
    <reusable-snackbar-success />
    <reusable-snackbar-warning />
    <reusable-snackbar-error />
    <reusable-snackbar-info />
    <reusable-snackbar-achievement />
    <Nuxt />
    <!-- footer kompas before login -->
    <Footer v-if="!loginCookie" />
    <!-- footer kompas-product after login  -->
    <kompas-footer v-if="loginCookie" />
  </div>
</template>

<script>
import Vue from 'vue'
import { excludeRouteName } from '~/assets/scripts/constants/excludeSnackbarRoute'

export default Vue.extend({
  data() {
    return {
      loginCookie: false,
    }
  },
  head() {
    return {
      meta: [
        { hid: 'og:image', name: 'og:image', content: 'https://www.kompas.id/img/defaults/image.png' },
        { hid: 'og:image:secure_url', name: 'og:image:secure_url', content: 'https://www.kompas.id/img/defaults/image.png' },
        { hid: 'og:image:width', name: 'og:image:width', content: '630' },
        { hid: 'og:image:height', name: 'og:image:height', content: '354' },
      ],
    }
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $route(to, from) {
      this.$gtm.push({ event: 'pageDetailsPushed' })
      this.checkLoginCookie() // check login cookie every page route
      // close snackbar every page change, except from excluded page
      if (!excludeRouteName.some((route) => from.path.includes(route))) {
        this.$store.dispatch('snackbar/showSnackbarSuccess', false)
        this.$store.dispatch('snackbar/showSnackbarSendLink', false)
        this.$store.dispatch('snackbar/showSnackbarWarning', false)
      }
    },
  },
  // check login cookie every page load
  created() {
    this.checkLoginCookie()
  },
  mounted() {
    this.$gtm.push({ event: 'pageDetailsPushed' })
  },
  methods: {
    checkLoginCookie() {
      const kantormu = this.$cookies.get('kantormu')
      if (kantormu) {
        this.loginCookie = true
      } else {
        this.loginCookie = false
      }
    },
  },
})
</script>
