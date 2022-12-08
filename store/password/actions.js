const actions = {
  setPasswordValue({ commit }, value) {
    commit('SET_PASSWORD_VALUE', value)
  },
  setPasswordScore({ commit }, value) {
    commit('SET_PASSWORD_SCORE', value)
  },
  isPasswordEmpty({ commit }, value) {
    commit('IS_PASSWORD_EMPTY', value)
  },
  isResetPasswordCanceled({ commit }, value) {
    commit('IS_PASSWORD_RESET_CANCELED', value)
  },
}

export default actions
