<template src="./template.html"></template>
<script>
import Vue from 'vue'
import { kBar } from '@kompas/ui'
import { backButtonIncludedRoute } from '~/assets/scripts/constants/backButtonRoute'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
export default Vue.extend({
  components: { kBar },
  data() {
    return {
      backButton: false,
    }
  },
  computed: {
    showBackButton() {
      return this.checkPageRoute()
    },
  },
  watch: {
    $route() {
      this.checkPageRoute()
    },
  },
  mounted() {
    this.checkPageRoute()
  },
  methods: {
    /* check page route to show back button */
    checkPageRoute() {
      const currentPath = this.$route.path
      const includedPath = backButtonIncludedRoute
      return includedPath.some((path) => currentPath.includes(path))
    },
    qrCodeTracker(pageName) {
      let result
      switch (pageName) {
        case 'qrcode-validation':
          result = 'qrcformIconheader'
          break
        case 'qrcode-onboarding':
          result = 'qrconboardIconheader'
          break
        case 'qrcode-error':
          result = 'qrcerrorIconheader'
          break
        default:
          result = null
          break
      }
      return result
    },
    gotToHomepage() {
      const pageName = this.$route.name

      if (this.qrCodeTracker(pageName) !== null) {
        eventTracker(this.qrCodeTracker(pageName))
      }
      window.location.href = 'https://kompas.id'
    },
  },
})
</script>
