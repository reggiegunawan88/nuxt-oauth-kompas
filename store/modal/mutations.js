const mutations = {
  /* auth modal mutations */
  SHOW_MODAL_AUTH(state) {
    state.auth.showModal = true
  },
  HIDE_MODAL_AUTH(state) {
    state.auth.showModal = false
  },
  SET_AUTH_TITLE(state, value) {
    state.auth.title = value
  },
  SET_AUTH_DESC(state, value) {
    state.auth.desc = value
  },
  SET_AUTH_BTN_PRIMARY_TEXT(state, value) {
    state.auth.btnPrimaryText = value
  },
  SET_AUTH_BTN_SECONDARY_TEXT(state, value) {
    state.auth.btnSecondaryText = value
  },
  SET_AUTH_ACTION_BTN(state, value) {
    state.auth.actionBtn = value
  },
  SET_AUTH_SHOW_LINK(state, value) {
    state.auth.showLink = value
  },
  SET_AUTH_TYPE(state, value) {
    state.auth.type = value
  },

  /* confirmation popup */
  SHOW_MODAL_CONFIRMATION(state, value) {
    state.showModalConfirmation = value
  },
  HIDE_MODAL_CONFIRMATION(state, value) {
    state.showModalConfirmation = value
  },
  // modal title and desc
  SET_MODAL_TITLE(state, value) {
    state.modalTitle = value
  },
  SET_MODAL_DESCRIPTION(state, value) {
    state.modalDescription = value
  },

  /* device */
  // modal for revoke device
  SHOW_MODAL_DEVICE(state, value) {
    state.showModalDevice = value
  },
  HIDE_MODAL_DEVICE(state, value) {
    state.showModalDevice = value
  },
  // device name and keyID
  SET_DEVICE_NAME(state, value) {
    state.deviceName = value
  },
  SET_DEVICE_KEY_ID(state, value) {
    state.deviceKeyID = value
  },
  IS_NATIVE_DEVICE(state, value) {
    state.isNativeDevice = value
  },
  // revoke all device
  REVOKE_ALL_DEVICE(state, value) {
    state.revokeAllDevice = value
  },
  /* SSO */
  // modal for delete address
  SET_ADDRESS_ID(state, value) {
    state.addressId = value
  },
  SHOW_MODAL_DELETE_ADDRESS(state) {
    state.showModalDeleteAddress = true
  },
  HIDE_MODAL_DELETE_ADDRESS(state) {
    state.showModalDeleteAddress = false
  },
  // modal for revoke sso
  SHOW_MODAL_SSO(state) {
    state.showModalSSO = true
  },
  HIDE_MODAL_SSO(state) {
    state.showModalSSO = false
  },
  SET_CLIENT_ID(state, value) {
    state.clientID = value
  },
  // access right popup
  SHOW_MODAL_ACCESS_RIGHT(state) {
    state.showModalAccessRight = true
  },
  HIDE_MODAL_ACCESS_RIGHT(state) {
    state.showModalAccessRight = false
  },
  SHOW_MODAL_TERMS_AND_CONDITIONS(state) {
    state.modalTermsAndConditions = true
  },
  HIDE_MODAL_TERMS_AND_CONDITIONS(state) {
    state.modalTermsAndConditions = false
  },

  // change password
  SHOW_MODAL_CHANGE_PASSWORD(state) {
    state.modalChangePassword = true
  },
  HIDE_MODAL_CHANGE_PASSWORD(state) {
    state.modalChangePassword = false
  },

  // form phone number
  SHOW_MODAL_ADD_PHONE_NUMBER(state) {
    state.modalAddPhoneNumber = true
  },
  HIDE_MODAL_ADD_PHONE_NUMBER(state) {
    state.modalAddPhoneNumber = false
  },
  SHOW_MODAL_UPDATE_PHONE_NUMBER(state) {
    state.modalUpdatePhoneNumber = true
  },
  HIDE_MODAL_UPDATE_PHONE_NUMBER(state) {
    state.modalUpdatePhoneNumber = false
  },

  // form otp
  SHOW_MODAL_OTP_PHONE_NUMBER(state) {
    state.modalOtpPhoneNumber = true
  },
  HIDE_MODAL_OTP_PHONE_NUMBER(state) {
    state.modalOtpPhoneNumber = false
  },
}

export default mutations
