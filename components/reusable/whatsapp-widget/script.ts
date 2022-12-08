import Vue from 'vue'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  methods: {
    whatsappDirect() {
      eventTracker('widgetWAHotline')
      const url = 'https://api.whatsapp.com/send?phone=6281290050800&text=Halo,%20saya%20membutuhkan%20bantuan/informasi%20mengenai%20Kompas.id'
      window.open(url, '_blank')
    },
  },
})
