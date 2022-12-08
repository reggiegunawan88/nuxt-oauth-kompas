const getters = {
  getPasswordValue: (state) => {
    return state.passwordValue
  },
  getPasswordScore: (state) => {
    return state.score
  },
  isPasswordEmpty: (state) => {
    return state.isPasswordEmpty
  },
  isResetPasswordCanceled: (state) => {
    return state.isPasswordResetCanceled
  },
}

export default getters
