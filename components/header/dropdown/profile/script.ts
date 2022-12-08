import Vue from 'vue'
import PopperVue from '@soldeplata/popper-vue'
import { capitalizeAllFirstCharacter } from '~/components/utils/helper/stringManipulation'

export default Vue.extend({
  components: {
    PopperVue,
  },
  props: ['userMembership'],
  data() {
    return {
      // label
      firstName: '',
      lastName: '',
      initialName: '',
      subscriptionText: '',
      buttonText: '',
      expired: '',

      // user subs active/not
      isSubscribed: null as any,
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
      ],
    }
  },
  mounted() {
    this.fillUserProfile()
    document.addEventListener('click', this.closePopper)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closePopper)
  },
  methods: {
    fillUserProfile() {
      this.firstName = capitalizeAllFirstCharacter(this.$props.userMembership.firstName)
      this.lastName = capitalizeAllFirstCharacter(this.$props.userMembership.lastName)
      this.initialName = this.$props.userMembership.firstName.charAt(0)
      this.subscriptionText = this.$props.userMembership.isActive
      this.expired = this.$props.userMembership.expired

      /* user subscription active/inactive
       * if updateMembership flag is null -> active subscription, vice versa
       */
      if (this.$props.userMembership.updateMembership !== null) {
        this.isSubscribed = false
        this.buttonText = this.$props.userMembership.updateMembership?.label
      } else {
        this.isSubscribed = true
      }
    },
    subscribe() {
      window.location.href = 'https://www.kompas.id/berlangganan'
    },
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
