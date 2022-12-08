import Vue from 'vue'
import { storePhoneNum } from '~/components/utils/helper/device'
export default Vue.extend({
  computed: {
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
  },
  methods: {
    // convert authentication data form state
    // value => userData.authentication
    getSocialName(value: any) {
      const list = [] as any

      // convert object to array
      let socialEntries: any[] = []
      if (value) {
        socialEntries = Object.entries(value)
      }
      socialEntries.forEach((v) => {
        const name = v[0]
        // set name text to capital
        const loweredCase = name.toLowerCase()
        const nameCapitalize = name[0].toUpperCase() + loweredCase.slice(1)

        list.push({
          name: nameCapitalize,
          ...(v[1] as any),
        })
      })

      const dataFilter = list.filter((e: any) => e.email) // filter if email is filled
      const dataName = dataFilter.map((x: any) => x.name) // get name from dataFilter
      const lastDataName = dataName.pop() // get last data name

      // add comma & 'dan' if name data is more than 1
      if (dataFilter.length > 1) return dataName.join(', ') + ' dan ' + lastDataName

      return lastDataName
    },
    handleSubmitPassword(val: any) {
      if (val === 'create') {
        this.$router.push('/reset-password/send-link')
      } else {
        this.$store.dispatch('modal/showModalChangePassword')
      }
    },
    handleSubmitPhoneNumber(val: any) {
      storePhoneNum(this.$auth.$storage, this.userData.phoneNumber, this.userData.phoneNumber)
      if (val === 'create') {
        this.$store.dispatch('modal/showModalAddPhoneNumber')
      } else {
        this.$store.dispatch('modal/showModalUpdatePhoneNumber')
      }
    },
  },
})
