import Vue from 'vue'
import PopperVue from '@soldeplata/popper-vue'

export default Vue.extend({
  components: {
    PopperVue,
  },
  data() {
    return {
      toggleCollapse: true,
      medalCollection: [
        {
          title: 'Pembaca Eksklusif',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/pembaca-eksklusif.svg'),
          popper: false,
          popperInfo: 'Perpanjang otomatis langganan Anda untuk jadi Pembaca Eksklusif.',
        },
        {
          title: 'Pembaca Premium',
          status: false,
          image: require('@/assets/kelola-akun/badges-icon/pembaca-premium.svg'),
          popper: false,
          popperInfo: 'Langganan paket Kompas Digital Premium 12 bulan untuk jadi Pembaca Premium.',
        },
      ],
    }
  },
  mounted() {
    document.addEventListener('click', this.closePopper)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closePopper)
  },
  methods: {
    handleToggleCollapse() {
      this.toggleCollapse = !this.toggleCollapse
    },
    closePopper(e: any) {
      const excludedId = e.target.closest('div').id
      this.medalCollection.forEach((e, index) => {
        if (excludedId !== `subs-popperBox-${index}` && excludedId !== `subs-popperButton-${index}`) {
          e.popper = false
        }
      })
    },
  },
})
