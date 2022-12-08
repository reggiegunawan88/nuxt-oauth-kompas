import Vue from 'vue'
import { validateEmptyValue, minPhoneNumLength, maxPhoneNumLength } from '~/components/utils/helper/stringManipulation'
import { anchoringErrorField } from '~/components/utils/helper/anchoring'
import { eventTracker } from '~/assets/scripts/gtm/tracker'

export default Vue.extend({
  data: () => ({
    // indicator load field on first load
    dataLoaded: false,
    addressListEmpty: false, // if true, set current address as main address

    // user data input
    label: '', // mandatory
    namaAlamat: '', // mandatory
    nomorTelp: '', // mandatory
    namaDepan: '', // mandatory
    namaBelakang: '',
    provinsi: '', // mandatory
    kabupatenKota: '', // mandatory
    kecamatan: '',
    kelurahan: '',
    alamat: '',
    kodePos: '', // mandatory
    checkbox: false, // checkbox for set as main address

    // validation field
    labelEmpty: false,
    namaDepanEmpty: false,
    alamatEmpty: false,
    kodePosEmpty: false,
    nomorTelpEmpty: false,
    provinsiEmpty: false,
    kabupatenKotaEmpty: false,
    kecamatanEmpty: false,
    kelurahanEmpty: false,
    phoneNumberIncorrect: false,
    maxPhoneNumber: false,
    minPhoneNumber: false,

    // first and last name special char validation
    firstNameInvalid: false,
    lastNameInvalid: false,

    // province list
    daftarKabupatenKota: [],
    daftarKecamatan: [],
    daftarKelurahan: [],
  }),

  // watch data changes
  computed: {
    // return all user input data for watcher
    inputData() {
      return `${this.namaDepan}|${this.namaBelakang}|${this.provinsi}|${this.kabupatenKota}|${this.kecamatan}|${this.kelurahan}|${this.kodePos}|${this.alamat}|${this.namaBelakang}|${this.nomorTelp}`
    },
    userData() {
      return this.$store.state.kelolaAkun.userData
    },
    userAddress() {
      return this.$store.state.address.userAddress
    },
    daftarProvinsi() {
      return this.$store.state.kelolaAkun.provinceList
    },
    // any data changes?
    isEditing() {
      return this.$store.state.kelolaAkun.isEditing
    },
  },
  /* watch/detect any data change for each fields */
  watch: {
    inputData() {
      if (this.dataLoaded) {
        this.$store.dispatch('kelolaAkun/isUserEditing', true)
      }
    },
    userAddress() {
      this.checkAddressListEmpty()
    },
  },

  // prevent page reload if user still editing data
  beforeMount() {
    window.addEventListener('beforeunload', this.preventPageReload)
  },
  mounted() {
    window.scrollTo(0, 0)
    this.checkAddressListEmpty()
    // skip watcher for first page load
    this.$nextTick(() => {
      this.dataLoaded = true
    })
  },

  methods: {
    // prevent page reload if user is editing
    preventPageReload(e: any) {
      if (!this.isEditing) return
      e.preventDefault()
      e.returnValue = ''
    },
    // check if address list from response is empty? if true then set current as main address
    checkAddressListEmpty() {
      this.addressListEmpty = false
      this.checkbox = false
      if (this.userAddress === null) {
        this.addressListEmpty = true
        this.checkbox = true
      }
    },
    // number input only for phone number
    onlyNumberInput(e: any) {
      if (/^\d+$/.test(String.fromCharCode(e.keyCode))) return true
      else {
        e.preventDefault()
      }
    },
    // prevent special char input for first and last name
    onlyAlphabetInput(e: any) {
      // exception for apostrophe
      if (/^[A-Za-z ']+$/.test(String.fromCharCode(e.keyCode))) return true
      else {
        e.preventDefault()
      }
    },
    fillAddressLabel(value: string) {
      this.label = value
      this.labelEmpty = validateEmptyValue(this.label)
    },
    /* free text fill
    - regex validation for mobile view only
    */
    fillFirstName(value: string) {
      this.namaDepan = value
      this.namaDepanEmpty = validateEmptyValue(this.namaDepan)
      this.firstNameInvalid = false
      if (!this.namaDepanEmpty) {
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
      this.namaBelakang = value
      this.lastNameInvalid = false
      if (value.length) {
        if (/^[A-Za-z ']+$/.test(value)) this.lastNameInvalid = false
        else {
          this.lastNameInvalid = true
        }
      }
    },
    fillAddress(value: string) {
      this.alamat = value
      this.alamatEmpty = validateEmptyValue(this.alamat)
    },
    fillPostalCode(value: string) {
      this.kodePos = value
      this.kodePosEmpty = validateEmptyValue(this.kodePos)
    },
    fillPhoneNumber(value: string) {
      this.nomorTelp = value
      this.phoneNumberIncorrect = false
      this.nomorTelpEmpty = validateEmptyValue(this.nomorTelp)
      this.maxPhoneNumber = maxPhoneNumLength(this.nomorTelp)
      this.minPhoneNumber = minPhoneNumLength(this.nomorTelp)
      // check if phone number value is exist
      if (value.length > 0) {
        // check if string contains only char [0-9]
        if (/^\d+$/.test(this.nomorTelp)) {
          this.phoneNumberIncorrect = false
        } else {
          this.phoneNumberIncorrect = true
          this.maxPhoneNumber = false
          this.minPhoneNumber = false
        }
      }
    },
    checkProvinceValue(value: string) {
      this.provinsiEmpty = validateEmptyValue(value)
    },
    checkCityValue(value: string) {
      this.kabupatenKotaEmpty = validateEmptyValue(value)
    },
    /* dropdown fill */
    selectProvince(value: any) {
      // init province with selected value
      this.provinsi = value
      this.provinsiEmpty = validateEmptyValue(this.provinsi)
      // change province -> delete all cities, district, village
      this.kabupatenKota = ''
      this.kecamatan = ''
      this.kelurahan = ''
      this.daftarKabupatenKota = []
      this.daftarKecamatan = []
      this.daftarKelurahan = []

      // generate city to array with selected province
      this.generateCity()
    },
    selectCity(value: any) {
      this.kabupatenKota = value
      this.kabupatenKotaEmpty = validateEmptyValue(this.kabupatenKota)
      // edit or change city -> delete all districts, villages
      this.kecamatan = ''
      this.kelurahan = ''
      this.daftarKecamatan = []
      this.daftarKelurahan = []

      // generate district to array with selected city
      this.generateDistrict()
    },
    selectDistrict(value: any) {
      this.kecamatan = value
      // edit or change district -> delete all villages
      this.kelurahan = ''
      this.daftarKelurahan = []
      if (value !== '') {
        // generate village to array with selected district
        this.generateVillage()
      }
    },
    selectVillage(value: any) {
      this.kelurahan = value
    },

    // generate all cities on click
    generateCity() {
      // mapping selected province and its cities
      if (this.provinsi !== '') {
        const res: any = this.daftarProvinsi.find((selectedProvince: any) => {
          return selectedProvince.province === this.provinsi
        })
        this.daftarKabupatenKota = res.cities
      }
    },

    // generate all district on click
    generateDistrict() {
      // daftar kabupaten/kota array filled -> straight mapping
      if (this.daftarKabupatenKota.length) {
        const res: any = this.daftarKabupatenKota.find((selectedCity: any) => {
          return selectedCity.city === this.kabupatenKota
        })
        this.daftarKecamatan = res.districts
      } else {
        // map kabupaten/kota
        const provinceList: any = this.daftarProvinsi.find((selectedProvince: any) => {
          return selectedProvince.province === this.provinsi
        })
        this.daftarKabupatenKota = provinceList.cities

        // map current kecamatan
        const districtList: any = this.daftarKabupatenKota.find((selectedCity: any) => {
          return selectedCity.city === this.kabupatenKota
        })
        this.daftarKecamatan = districtList.districts
      }
    },

    // generate all village on click
    generateVillage() {
      // daftar kecamatan array filled -> straight mapping
      if (this.daftarKecamatan.length) {
        // mapping selected province and its cities
        const res: any = this.daftarKecamatan.find((selectedDistrict: any) => {
          return selectedDistrict.district === this.kecamatan
        })
        this.daftarKelurahan = res.villages
      } else {
        // map kabupaten/kota
        const provinceList: any = this.daftarProvinsi.find((selectedProvince: any) => {
          return selectedProvince.province === this.provinsi
        })
        this.daftarKabupatenKota = provinceList.cities

        // map current kecamatan
        const districtList: any = this.daftarKabupatenKota.find((selectedCity: any) => {
          return selectedCity.city === this.kabupatenKota
        })
        this.daftarKecamatan = districtList.districts

        // map current kelurahan
        const res: any = this.daftarKecamatan.find((selectedDistrict: any) => {
          return selectedDistrict.district === this.kecamatan
        })
        this.daftarKelurahan = res.villages
      }
    },

    // check box to set as main address
    setMainAddress(value: boolean) {
      this.checkbox = value
    },
    // check if user data is valid and filled
    validateUserData() {
      this.labelEmpty = validateEmptyValue(this.label)
      this.namaDepanEmpty = validateEmptyValue(this.namaDepan)
      this.provinsiEmpty = validateEmptyValue(this.provinsi)
      this.kabupatenKotaEmpty = validateEmptyValue(this.kabupatenKota)
      this.alamatEmpty = validateEmptyValue(this.alamat)
      this.kodePosEmpty = validateEmptyValue(this.kodePos)
      this.nomorTelpEmpty = validateEmptyValue(this.nomorTelp)
      this.maxPhoneNumber = maxPhoneNumLength(this.nomorTelp)
      this.minPhoneNumber = minPhoneNumLength(this.nomorTelp)
      // anchor validation
      if (this.anchoringError()) {
        return true
      }
    },

    /* CTA action */
    async saveAddress() {
      const data = {
        label: this.label.trim(),
        firstName: this.namaDepan.trim(),
        lastName: this.namaBelakang.trim(),
        province: this.provinsi,
        city: this.kabupatenKota,
        district: this.kecamatan,
        village: this.kelurahan,
        address: this.alamat.trim(),
        postalCode: this.kodePos,
        phoneNumber: this.nomorTelp,
        isMainAddress: this.checkbox,
      }
      /* validate if mandatory data complete and valid */
      if (this.validateUserData()) {
        eventTracker('saveAddress')
        await this.$store.dispatch('address/addUserAddress', data).then(() => {
          this.$store.dispatch('address/getUserAddress', data)
          // show snackbar
          this.$store.dispatch('snackbar/showSnackbarSuccess', true)
          this.$store.dispatch('snackbar/setSnackbarDesc', 'Alamat berhasil ditambahkan dan dijadikan alamat utama.')
          this.redirectAfterSaveData()
        })
      }
    },
    // call this func after req axios
    redirectAfterSaveData() {
      this.$store.dispatch('kelolaAkun/isUserEditing', false)
      /* redirect */
      this.$router.push('/manage-account/account-detail/address')
      /* show and set snackbar desc */
      this.$store.dispatch('snackbar/showSnackbarSuccess', true)
      this.$store.dispatch('snackbar/setSnackbarDesc', 'Alamat berhasil ditambahkan dan dijadikan alamat utama.')
      this.$store.dispatch('snackbar/hideSnackbarError') // hide snackbar error to prevent snackbar stacking
    },
    cancelEdit() {
      if (this.isEditing) {
        // data changed, show modal confirmation
        this.$store.dispatch('modal/showModalConfirmation')
        this.$store.dispatch('modal/setModalTitle', 'alamat')
      } else {
        // route to prev page directly
        this.$router.push('/manage-account/account-detail/address')
      }
    },
    // anchoring/scrolling to each mandatory error field (indicator by $refs)
    anchoringError() {
      // List data field
      const listElement = [
        {
          element: this.$refs.label,
          error: this.labelEmpty,
        },
        {
          element: this.$refs.nomorTelp,
          error: this.nomorTelpEmpty || this.phoneNumberIncorrect || this.maxPhoneNumber || this.minPhoneNumber,
        },
        {
          element: this.$refs.namaDepan,
          error: this.namaDepanEmpty || this.firstNameInvalid,
        },
        {
          element: this.$refs.namaBelakang,
          error: this.lastNameInvalid,
        },
        {
          element: this.$refs.provinsi,
          error: this.provinsiEmpty,
        },
        {
          element: this.$refs.kabupatenKota,
          error: this.kabupatenKotaEmpty,
        },
        {
          element: this.$refs.alamat,
          error: this.alamatEmpty,
        },
        {
          element: this.$refs.kodePos,
          error: this.kodePosEmpty,
        },
      ]

      // re-use helper function
      return anchoringErrorField(listElement)
    },
  },
})
