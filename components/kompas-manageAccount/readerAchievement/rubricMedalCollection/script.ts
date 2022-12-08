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
          title: 'Ekonom',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/ekonomi-ahli-ekonomi.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Ekonomi untuk jadi Ekonom.',
        },
        {
          title: 'Humanis',
          status: false,
          image: require('@/assets/kelola-akun/badges-icon/humaniora-humanis.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Humaniora untuk jadi Humanis.',
        },
        {
          title: 'Warga Global',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/international-warga-global.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Internasional untuk jadi Warga Global.',
        },
        {
          title: 'Warga Kota',
          status: false,
          image: require('@/assets/kelola-akun/badges-icon/metropolitan-warga-kota.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Metropolitan untuk jadi Warga Kota.',
        },
        {
          title: 'Nasionalis',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/nusantara-nasionalis.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Nusantara untuk jadi Nasionalis.',
        },
        {
          title: 'Olahragawan',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/olahraga-olahragawan.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Olahraga untuk jadi Olahragawan.',
        },
        {
          title: 'Pembaca Bijaksana',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/opini-pembaca-bijaksana.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Opini untuk jadi Pembaca Bijaksana.',
        },
        {
          title: 'Petualang',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/perjalanan-petualang.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Perjalanan untuk jadi Petualang.',
        },
        {
          title: 'Pengamat Politik',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/politik-hukum-pengamat-politik.svg'),
          popper: false,
          popperInfo: 'Baca 36 artikel dari rubrik Politik & Hukum untuk jadi Pengamat Politik.',
        },
        {
          title: 'The Expert',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/english-the-expert.svg'),
          popper: false,
          popperInfo: 'Baca 24 artikel dari rubrik English untuk jadi The Expert.',
        },
        {
          title: 'Fotografer',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/fotografi-fotografer.svg'),
          popper: false,
          popperInfo: 'Baca 24 artikel dari rubrik Fotografi untuk jadi Fotografer.',
        },
        {
          title: 'Paling Hits',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/gaya-hidup-paling-hits.svg'),
          popper: false,
          popperInfo: 'Baca 24 artikel dari rubrik Gaya Hidup untuk jadi Paling Hits.',
        },
        {
          title: 'Pencari Fakta',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/riset-pencari-fakta.svg'),
          popper: false,
          popperInfo: 'Baca 24 artikel dari rubrik Riset untuk jadi Pencari Fakta.',
        },
        {
          title: 'Penggiat Sastra',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/sastra-penggiat-sastra.svg'),
          popper: false,
          popperInfo: 'Baca 24 artikel dari rubrik Sastra untuk jadi Penggiat Sastra.',
        },
        {
          title: 'Penonton Setia',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/video-penonton-setia.svg'),
          popper: false,
          popperInfo: 'Nonton 24 video dari rubrik Video untuk jadi Penonton Setia.',
        },
        {
          title: 'Sejarawan',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/arsip-kompas-hobi-bernostalgia.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Arsip Kompas untuk jadi Hobi Sejarawan.',
        },
        {
          title: 'Kutu Buku',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/buku-kutu-buku.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Buku untuk jadi Kutu Buku.',
        },
        {
          title: 'Si Selalu Ingin Tahu',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/dibalik-berita-si-kepo.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Di Balik Berita untuk jadi Si Selalu Ingin Tahu.',
        },
        {
          title: 'Pembaca Bahagia',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/hiburan-pembaca-bahagia.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Hiburan untuk jadi Pembaca Bahagia.',
        },
        {
          title: 'Berpikiran Terbuka',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/taja-pembaca-segala.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Taja untuk jadi Berpikiran Terbuka.',
        },
        {
          title: 'Berjiwa Muda',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/muda-berjiwa-muda.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Muda untuk jadi Berjiwa Muda.',
        },
        {
          title: 'Penggemar Interaktif',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/tutur-visual-pecinta-visual.svg'),
          popper: false,
          popperInfo: 'Nikmati 12 artikel dari rubrik Tutur Visual untuk jadi Penggemar Interaktif.',
        },
        {
          title: 'Pencinta Visual',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/infografik-pecinta-infografik.svg'),
          popper: false,
          popperInfo: 'Nikmati 12 artikel dari rubrik Infografik untuk jadi Pencinta Visual.',
        },
        {
          title: 'Penggemar Tokoh',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/tokoh-penggemar-tokoh.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Tokoh untuk jadi Penggemar Tokoh.',
        },
        {
          title: 'Penyelidik',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/invetigas-detektif.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Investigasi untuk jadi Penyelidik.',
        },
        {
          title: 'Paling Sigap',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/arsip-reportase-langsung-paling-sigap.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari Arsip Reportase Langsung untuk jadi yang Paling Sigap.',
        },
        {
          title: 'Penjelajah',
          status: true,
          image: require('@/assets/kelola-akun/badges-icon/jelajah-penjelajah.svg'),
          popper: false,
          popperInfo: 'Baca 12 artikel dari rubrik Jelajah untuk jadi Penjelajah.',
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
        if (excludedId !== `rubrik-popperBox-${index}` && excludedId !== `rubrik-popperButton-${index}`) {
          e.popper = false
        }
      })
    },
  },
})
