const state = () => ({
  /* detail akun pengguna kompas.id */
  userData: [],
  userMembership: [],
  userYear: [],
  userPromotion: null,

  // data diri
  userDataComplete: null,
  userVerified: null,
  changeUserPassword: '',
  countryList: [],

  // alamat
  provinceList: [],

  // ubah sandi
  password: {
    statusCode: 0,
  },

  /* aktivitas pengguna kompas.id - device */
  userDevices: [],
  revokeDevices: [],
  ssoList: [],
  deviceHasBeenRevoked: false,

  /* user is editing any form? */
  isEditing: false,

  /* user access */
  userAccess: {
    data: null,
    error: null,
    isLoading: false,
  },

  /* user notification */
  userNotification: {
    next: 0,
    count: null,
    list: [],
    loadMore: false,
    isLoading: true,
  },
})

export default state
