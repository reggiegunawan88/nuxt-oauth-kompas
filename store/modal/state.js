const state = () => ({
  /* auth modal */
  auth: {
    showModal: false,
    title: '',
    desc: '',
    btnPrimaryText: '',
    btnSecondaryText: '',
    actionBtn: '' /* value: 'login' / 'register' */,
    showLink: false,
    type: '',
  },

  /* data diri, alamat, ubah sandi -> detail akun */
  showModalConfirmation: false,
  modalTitle: '',
  modalDescription: '',

  /* atur perangkat (device) */
  showModalDevice: false,
  revokeAllDevice: null,
  deviceName: '',
  deviceKeyID: '',
  isNativeDevice: false,

  /* alamat v2 */
  showModalDeleteAddress: false,
  addressId: '',

  /* akses akun (sso) */
  showModalSSO: false,
  clientID: '',

  /* hak akses (subscription information) */
  showModalAccessRight: false,

  /* terms and conditions */
  modalTermsAndConditions: false,

  /* change password */
  modalChangePassword: false,

  /* phone number */
  modalAddPhoneNumber: false,
  modalUpdatePhoneNumber: false,

  /* OTP */
  modalOtpPhoneNumber: false,
})

export default state
