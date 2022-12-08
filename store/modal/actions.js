const actions = {
  /* dispatch for auth modal */
  showModalAuth({ commit }) {
    commit('SHOW_MODAL_AUTH')
  },
  hideModalAuth({ commit }) {
    commit('HIDE_MODAL_AUTH')
  },
  setAuthTitle({ commit }, value) {
    commit('SET_AUTH_TITLE', value)
  },
  setAuthDesc({ commit }, value) {
    commit('SET_AUTH_DESC', value)
  },
  setAuthPrimaryBtnText({ commit }, value) {
    commit('SET_AUTH_BTN_PRIMARY_TEXT', value)
  },
  setAuthSecondaryBtnText({ commit }, value) {
    commit('SET_AUTH_BTN_SECONDARY_TEXT', value)
  },
  setAuthActionBtn({ commit }, value) {
    commit('SET_AUTH_ACTION_BTN', value)
  },
  setAuthShowLink({ commit }, value) {
    commit('SET_AUTH_SHOW_LINK', value)
  },
  setAuthType({ commit }, value) {
    commit('SET_AUTH_TYPE', value)
  },

  /* dispatch for confirmation popup modal */
  showModalConfirmation({ commit }) {
    commit('SHOW_MODAL_CONFIRMATION', true)
  },
  hideModalConfirmation({ commit }) {
    commit('HIDE_MODAL_CONFIRMATION', false)
  },
  setModalTitle({ commit }, value) {
    commit('SET_MODAL_TITLE', value)
  },
  setModalDescription({ commit }, value) {
    commit('SET_MODAL_DESCRIPTION', value)
  },

  // set if device is native (mobile) or no
  isNativeDevice({ commit }, value) {
    commit('IS_NATIVE_DEVICE', value)
  },
  /* dispatch for revoke device modal */
  showModalDevice({ commit }) {
    commit('HIDE_MODAL_DEVICE', true)
  },
  hideModalDevice({ commit }) {
    commit('HIDE_MODAL_DEVICE', false)
  },
  setDeviceName({ commit }, value) {
    commit('SET_DEVICE_NAME', value)
  },
  setDeviceKeyID({ commit }, value) {
    commit('SET_DEVICE_KEY_ID', value)
  },
  revokeAllDevice({ commit }, value) {
    commit('REVOKE_ALL_DEVICE', value)
  },

  /* dispatch for modal delete address */
  setAddressId({ commit }, value) {
    commit('SET_ADDRESS_ID', value)
  },
  showModalDeleteAddress({ commit }) {
    commit('SHOW_MODAL_DELETE_ADDRESS')
  },
  hideModalDeleteAddress({ commit }) {
    commit('HIDE_MODAL_DELETE_ADDRESS')
  },
  /* dispatch for revoke sso */
  showModalSSO({ commit }) {
    commit('SHOW_MODAL_SSO')
  },
  hideModalSSO({ commit }) {
    commit('HIDE_MODAL_SSO')
  },
  setClientID({ commit }, value) {
    commit('SET_CLIENT_ID', value)
  },
  /* dispatch for access right popup */
  showModalAccessRight({ commit }) {
    commit('SHOW_MODAL_ACCESS_RIGHT')
  },
  hideModalAccessRight({ commit }) {
    commit('HIDE_MODAL_ACCESS_RIGHT')
  },
  /* dispatch for Terms and Conditions */
  showModalTermsAndConditions({ commit }) {
    commit('SHOW_MODAL_TERMS_AND_CONDITIONS')
  },
  hideModalTermsAndConditions({ commit }) {
    commit('HIDE_MODAL_TERMS_AND_CONDITIONS')
  },

  /* dispatch for change password */
  showModalChangePassword({ commit }) {
    commit('SHOW_MODAL_CHANGE_PASSWORD', true)
  },
  hideModalChangePassword({ commit }) {
    commit('HIDE_MODAL_CHANGE_PASSWORD', false)
  },

  /* dispatch for phone number */
  showModalAddPhoneNumber({ commit }) {
    commit('SHOW_MODAL_ADD_PHONE_NUMBER', true)
  },
  hideModalAddPhoneNumber({ commit }) {
    commit('HIDE_MODAL_ADD_PHONE_NUMBER', false)
  },
  showModalUpdatePhoneNumber({ commit }) {
    commit('SHOW_MODAL_UPDATE_PHONE_NUMBER', true)
  },
  hideModalUpdatePhoneNumber({ commit }) {
    commit('HIDE_MODAL_UPDATE_PHONE_NUMBER', false)
  },

  /* dispatch for OTP */
  showModalOtpPhoneNumber({ commit }) {
    commit('SHOW_MODAL_OTP_PHONE_NUMBER', true)
  },
  hideModalOtpPhoneNumber({ commit }) {
    commit('HIDE_MODAL_OTP_PHONE_NUMBER', false)
  },
}

export default actions
