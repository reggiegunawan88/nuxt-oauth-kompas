import Vue from 'vue'
import PopperVue from '@soldeplata/popper-vue'

export default Vue.extend({
  components: {
    PopperVue,
  },
  data() {
    return {
      readingStatus: [
        {
          title: 'Pembaca Santai',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/pembaca-santai.svg'),
          popper: false,
          popperInfo: 'Baca sampai 19 artikel dalam seminggu untuk jadi Pembaca Santai.',
        },
        {
          title: 'Pembaca Teladan',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/pembaca-teladan.svg'),
          popper: false,
          popperInfo: 'Baca minimal 20 artikel dalam seminggu artikel untuk jadi Pembaca Teladan.',
        },
        {
          title: 'Pembaca Setia',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/pembaca-setia.svg'),
          popper: false,
          popperInfo: 'Baca lebih dari 25 artikel dalam seminggu untuk jadi Pembaca Setia.',
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
      this.readingStatus.forEach((e, index) => {
        if (excludedId !== `popperBox-${index}` && excludedId !== `popperButton-${index}`) {
          e.popper = false
        }
      })
    },
    getActiveClass(index: any) {
      let newClass = 'font-normal'

      if (index === 0) {
        if (this.readingStatus[index].status === true && !this.readingStatus[1].status && !this.readingStatus[2].status) {
          newClass = 'font-bold'
        }
      }
      if (index === 1) {
        if (this.readingStatus[index].status === true && !this.readingStatus[2].status) {
          newClass = 'font-bold'
        }
      }
      if (index === 2) {
        if (this.readingStatus[index].status === true) {
          newClass = 'font-bold'
        }
      }

      return newClass
    },
  },
})
