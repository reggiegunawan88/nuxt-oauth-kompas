const mutations = {
  // authorization code
  SET_AUTH_CODE(state, obj) {
    state.ssoAuthCode.data = obj
  },
  SET_AUTH_CODE_LOADING(state, value) {
    state.ssoAuthCode.isLoading = value
  },
  SET_AUTH_CODE_ERROR(state, value) {
    state.ssoAuthCode.error = value
  },

  // sso linking
  SET_SSO_LINKING(state, obj) {
    state.ssoLinking.data = obj
  },
  SET_SSO_LINKING_LOADING(state, value) {
    state.ssoLinking.isLoading = value
  },
  SET_SSO_LINKING_ERROR(state, value) {
    state.ssoLinking.error = value
  },

  // confirm sso linking
  SET_CONFIRM_SSO_LOADING(state, value) {
    state.confirmSsoLinking.isLoading = value
  },
  SET_CONFIRM_SSO_ERROR(state, value) {
    state.confirmSsoLinking.error = value
  },

  // set sso list
  SET_SSO_LIST(state, value) {
    state.ssoList = value
  },
}

export default mutations
