import Vue from 'vue'
import moment from 'moment'
import { eventTracker } from '~/assets/scripts/gtm/tracker'
import { capitalizeAllFirstCharacter, detectSpecialChar, maxPhoneNumLength, minPhoneNumLength, validateEmptyValue } from '~/components/utils/helper/stringManipulation'
import { reformDate, formatDate } from '~/components/utils/helper/date'
import { anchoringErrorField } from '~/components/utils/helper/anchoring'

export default Vue.extend({
  data: () => ({
    // indicator load field on first load
    dataLoaded: false,
    // Data
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    dateBirth: '',
    date: null as any,
    month: '',
    year: '',
    country: '',
    province: '',
    city: '',
    // max iteration for date and years
    maxDate: 31,
    maxYears: 100,
    // Validasi
    firstNameInvalid: false,
    lastNameInvalid: false,
    isFirstNameEmpty: false,
    emptyDate: false,
    emptyMonth: false,
    emptyYear: false,
    isValid: true,
    phoneNumberIncorrect: false,
    maxPhoneNumber: false,
    minPhoneNumber: false,
    // city list
    cityList: [],
  }),
  // watch input field
  computed: {
    inputData() {
      return `${this.firstName}|${this.lastName}|${this.phoneNumber}|${this.gender}|${this.date}|${this.month}|${this.year}|${this.country}|${this.province}|${this.city}`
    },
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
    // for province list data (ID)
    provinceList() {
      return this.$store.state.kelolaAkun.provinceList
    },
    // for country list data
    countryList() {
      return this.$store.state.kelolaAkun.countryList
    },
    // any data changes?
    isEditing() {
      return this.$store.state.kelolaAkun.isEditing
    },
  },
  watch: {
    // watch changes in every input data field
    inputData() {
      if (this.dataLoaded) {
        this.$store.dispatch('kelolaAkun/isUserEditing', true)
      }
    },
    provinceList() {
      // country = Indonesia? then generate city
      if (this.country === 'Indonesia') {
        this.generateCity()
      }
    },
    // watch user data changes
    async userData() {
      await this.setToDataField()
      this.dataLoaded = true
    },
  },
  // prevent user reload while edit data
  beforeMount() {
    window.addEventListener('beforeunload', this.preventReload)
  },
  async mounted() {
    // if user data value is exist, then set data to each field
    if (this.userData.firstName !== undefined) {
      await this.setToDataField()
      this.dataLoaded = true
    }
  },
  methods: {
    preventReload(e: any) {
      if (!this.isEditing) return
      e.preventDefault()
      e.returnValue = ''
    },
    setBirthDate() {
      this.dateBirth = this.date + '-' + this.month + '-' + this.year
      this.validateCompleteDateBirth()
    },
    // Set to value into input value
    setToDataField() {
      this.firstName = validateEmptyValue(this.userData?.firstName) ? '' : capitalizeAllFirstCharacter(this.userData?.firstName)
      this.lastName = validateEmptyValue(this.userData?.lastName) ? '' : capitalizeAllFirstCharacter(this.userData?.lastName)
      this.phoneNumber = this.userData.phoneNumber
      this.gender = this.userData.gender
      this.country = this.userData.country
      this.province = this.userData.province
      this.city = this.userData.city
      // cek apakah tanggal lahir ada
      if (this.userData?.dateBirth === '0001-01-01T00:00:00Z') {
        this.date = ''
        this.month = ''
        this.year = ''
      } else {
        const userBirthday = reformDate(this.userData.dateBirth)
        this.date = parseInt(userBirthday.split('-')[0]) // date must be convert to int for HTML component
        this.month = userBirthday.split('-')[1]
        this.year = userBirthday.split('-')[2]
      }
    },
    nameInput(e: { keyCode: number; preventDefault: () => void }) {
      const char = String.fromCharCode(e.keyCode)
      if (/^[A-Za-z ']+$/.test(char)) return true
      else e.preventDefault()
    },
    // number input only for phone number
    onlyNumberInput(e: any) {
      if (/^\d+$/.test(String.fromCharCode(e.keyCode))) return true
      else {
        e.preventDefault()
      }
    },
    /* free text fill */
    fillFirstName(value: string): void {
      this.firstName = value
      this.isFirstNameEmpty = validateEmptyValue(this.firstName)
      if (!this.isFirstNameEmpty) {
        if (/^[A-Za-z ']+$/.test(value)) this.firstNameInvalid = false
        else {
          this.firstNameInvalid = true
        }
      }
    },
    /* free text fill
    - regex validation for mobile view only
    */
    fillLastName(value: string) {
      this.lastName = value
      this.lastNameInvalid = false
      if (value.length) {
        if (/^[A-Za-z ']+$/.test(value)) this.lastNameInvalid = false
        else {
          this.lastNameInvalid = true
        }
      }
    },
    // phone nunmber validation
    fillPhoneNumber(value: string): void {
      this.phoneNumber = value
      this.maxPhoneNumber = maxPhoneNumLength(this.phoneNumber)
      this.minPhoneNumber = minPhoneNumLength(this.phoneNumber)
      if (detectSpecialChar(this.phoneNumber)) {
        this.phoneNumberIncorrect = true
        this.maxPhoneNumber = false
        this.minPhoneNumber = false
      } else {
        this.phoneNumberIncorrect = false
      }
    },
    // check if datebirth is complete
    validateCompleteDateBirth() {
      const check = moment(`${this.year}-${this.month}-${this.date}`, 'YYYY/MM/DD')

      this.emptyDate = false
      this.emptyMonth = false
      this.emptyYear = false
      this.isValid = true

      if (this.date && this.month && this.year) {
        this.isValid = check.isValid()
        return false
      }

      if (this.date !== '' || this.month !== '' || this.year !== '') {
        if (validateEmptyValue(this.date)) {
          this.emptyDate = true
        }
        if (validateEmptyValue(this.month)) {
          this.emptyMonth = true
        }
        if (validateEmptyValue(this.year)) {
          this.emptyYear = true
        }
        return false
      }
      return true
    },
    selectCountry(value: any) {
      this.country = value
      this.province = ''
      this.city = ''
    },
    /* dropdown fill untuk provinsi */
    selectProvince(value: any) {
      this.province = value
      // edit or change province -> delete all cities
      this.city = ''
      this.cityList = []

      // generate cities
      const res: any = this.provinceList.find((selectedProvince: any) => {
        return selectedProvince.province === this.province
      })
      this.cityList = res.cities
    },
    // generate all cities on page load
    generateCity() {
      // mapping selected province and its cities
      if (this.province !== '') {
        const res: any = this.provinceList.find((selectedProvince: any) => {
          return selectedProvince.province === this.province
        })
        this.cityList = res.cities
      }
    },
    /* dropdown fill untuk kota */
    selectCity(value: any) {
      this.city = value
    },
    // Validasi data yang required
    validateUserData() {
      // validation by anchor function
      if (this.anchoringToErrorField()) {
        eventTracker('personaldataSave')
        this.saveData()
      }
    },
    // Kirim data
    async saveData() {
      // set user editing status: false
      this.$store.dispatch('kelolaAkun/isUserEditing', false)
      // if datebirth is empty then set to default value
      if (this.date === '' && this.month === '' && this.year === '') {
        await this.$store.dispatch('kelolaAkun/updateUserData', {
          firstName: this.firstName.trimStart(),
          lastName: this.lastName.trimStart(),
          phoneNumber: this.phoneNumber,
          gender: parseInt(this.gender),
          dateBirth: '0001-01-01T00:00:00Z', // default empty value
          country: this.country,
          province: this.province.trimStart(),
          city: this.city.trimStart(),
        })
      } else {
        await this.$store.dispatch('kelolaAkun/updateUserData', {
          firstName: this.firstName.trimStart(),
          lastName: this.lastName.trimStart(),
          phoneNumber: this.phoneNumber,
          gender: parseInt(this.gender),
          dateBirth: formatDate(moment, this.date, this.month, this.year),
          country: this.country,
          province: this.province.trimStart(),
          city: this.city.trimStart(),
        })
      }
      window.removeEventListener('beforeunload', this.preventReload)
      this.$store.dispatch('kelolaAkun/getMembership')
      this.$store.dispatch('kelolaAkun/getUserData')
    },
    // user cancel editing
    cancelEdit() {
      if (this.isEditing === true) {
        this.$store.dispatch('modal/showModalConfirmation')
        this.$store.dispatch('modal/setModalTitle', 'Data diri')
      } else {
        this.$router.push('/manage-account/account-detail/personal-data')
      }
    },
    // anchoring/scrolling to each error mandatory field (indicator by $refs)
    anchoringToErrorField() {
      // list DOM elements
      const listElements = [
        {
          element: this.$refs.firstName,
          error: validateEmptyValue(this.firstName) || this.firstNameInvalid,
        },
        {
          element: this.$refs.lastName,
          error: this.lastNameInvalid,
        },
        {
          element: this.$refs.phoneNumber,
          error: this.maxPhoneNumber || this.minPhoneNumber || this.phoneNumberIncorrect,
        },
        {
          element: this.$refs.dateBirth,
          error: this.emptyDate || this.emptyMonth || this.emptyYear,
        },
        {
          element: this.$refs.dateBirth,
          error: !this.isValid,
        },
      ]
      return anchoringErrorField(listElements)
    },
  },
})
