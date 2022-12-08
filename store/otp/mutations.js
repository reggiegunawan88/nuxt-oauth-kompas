const mutations = {
  SET_OTP_TIMER(state, value) {
    state.otpTimer = value
  },
  SAVE_EMAIL_VALUE(state, value) {
    state.emailValue = value
  },
  DECREASE_TIMER(state) {
    state.otpTimer--
  },
}

export default mutations
