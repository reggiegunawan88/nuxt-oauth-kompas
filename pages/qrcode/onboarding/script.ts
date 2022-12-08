import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  layout: 'onboardingLayout',
  data() {
    return {
      epaperImage: null,
      epaperLink: null,
    }
  },
  computed: {
    /* get E-Paper Data */
    ePaperData() {
      return this.$store.state.epaper.ePaperData
    },
  },
  watch: {
    ePaperData() {
      this.epaperImage = this.$store.state.epaper.ePaperData.result.results.thumbnail[1]
      this.epaperLink = this.$store.state.epaper.ePaperData.result.results.url
    },
  },
  mounted() {
    this.$store.dispatch('epaper/getNewEpaper')
    this.bannerContent()
  },
  methods: {
    bannerContent() {
      const status = this.$route.query.status
      let result
      switch (status) {
        case 'alreadyRegistered':
          result = {
            title: 'Anda sudah Punya Akses Premium Kompas.id',
            info: 'Kode QR sudah pernah Anda pindai dan akses ke seluruh konten premium <br class="hidden tablet:block">sudah dapat digunakan.',
          }
          break
        default:
          result = {
            title: 'Selamat Bergabung di Kompas.id!',
            info: 'Anda mendapatkan akses ke seluruh konten premium Kompas.id terhitung sejak <br class="hidden tablet:block">Anda memindai kode QR.*',
          }
          break
      }
      return result
    },
    showModalTermsConditions() {
      /* GTM tracker */
      eventTracker('qrconboardSnk')

      this.$store.dispatch('modal/showModalTermsAndConditions')
    },
    goToHomepage() {
      /* GTM tracker */
      eventTracker('qrconboardMulaibaca')

      window.location.href = this.$config.redirect
    },
    handleTracker(trackerEvent: any) {
      /* GTM tracker */
      eventTracker(trackerEvent)
    },
  },
})
