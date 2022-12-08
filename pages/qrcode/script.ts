import Vue from 'vue'

export default Vue.extend({
  layout: 'onboardingLayout',
  middleware: 'setTokenSecondary',
  mounted() {
    this.consumeAPI()
  },
  methods: {
    async consumeAPI() {
      const code = this.$route.query.code
      const originUrl = window.location.origin
      const kantormu = this.$cookies.get('kantormu')
      const refreshToken = this.$cookies.get('kompas._token_refresh')

      await this.$store.dispatch('qrcode/scanQrcode', { code }).then((response: any) => {
        const data = response.data
        if (data.code === 200) {
          if (!kantormu && !refreshToken) {
            const prevUrl = `${originUrl}/qrcode/validation?code=${data.data.code}`
            this.$auth.$storage.setUniversal('prevUrl', prevUrl)
            this.$router.push(`login?next=${prevUrl}`)
          } else {
            this.$router.push(`/qrcode/validation?code=${data.data.code}&qrcType=login`)
          }
        }
      })
    },
  },
})
