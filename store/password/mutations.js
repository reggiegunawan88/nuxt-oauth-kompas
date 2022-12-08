const mutations = {
  SET_PASSWORD_VALUE(state, value) {
    state.passwordValue = value
  },
  SET_PASSWORD_SCORE(state, value) {
    state.score = value
  },
  IS_PASSWORD_EMPTY(state, value) {
    state.isPasswordEmpty = value
  },
  IS_PASSWORD_RESET_CANCELED(state, value) {
    state.isPasswordResetCanceled = value
  },
}

export default mutations
