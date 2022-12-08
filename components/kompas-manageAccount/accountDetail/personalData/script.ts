import Vue from 'vue'
import { reformDateWithMonths } from '~/components/utils/helper/date'
import { capitalizeAllFirstCharacter, validateEmptyValue } from '~/components/utils/helper/stringManipulation'
export default Vue.extend({
  data: () => ({
    // first name and last name from membership API
    firstName: '',
    lastName: '',

    // default empty state for datebirth timestamp
    emptyDateBirthFormat: '0001-01-01T00:00:00Z',
  }),
  computed: {
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
    userMembership() {
      return this.$store.state.kelolaAkun.userMembership
    },
    daftarProvinsi() {
      return this.$store.state.kelolaAkun.provinceList
    },
  },
  mounted() {
    window.scrollTo(0, 0) // scroll to top of the page
  },
  methods: {
    capitalizeName(value: string) {
      return validateEmptyValue(value) ? '' : capitalizeAllFirstCharacter(value)
    },
    getFullDate() {
      return reformDateWithMonths(this.userData.dateBirth)
    },
  },
})
