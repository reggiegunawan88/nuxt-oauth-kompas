import Vue from 'vue'
import PopperVue from '@soldeplata/popper-vue'

export default Vue.extend({
  components: {
    PopperVue,
  },
  data() {
    return {
      readerBadge: [
        {
          title: 'Pembaca Santai',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/pembaca-santai.svg'),
          popper: false,
          popperInfo: 'Baca sampai 19 artikel dalam seminggu untuk jadi Pembaca Santai.',
        },
        {
          title: 'Ekonom',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/ekonomi-ahli-ekonomi.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Ekonomi untuk jadi Ekonom.',
        },
        {
          title: 'Humanis',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/humaniora-humanis.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Humaniora untuk jadi Humanis.',
        },
        {
          title: 'Warga Global',
          status: false,
          image: require('@/assets/kelola-akun/badges-icon/international-warga-global.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Internasional untuk jadi Warga Global.',
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
    closePopper(e: any) {
      const excludedId = e.target.closest('div').id
      this.readerBadge.forEach((e, index) => {
        if (excludedId !== `header-popperBox-${index}` && excludedId !== `header-popperButton-${index}`) {
          e.popper = false
        }
      })
    },
  },
})
