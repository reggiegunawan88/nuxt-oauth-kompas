const getters = {
  getRemainingTime: (state) => {
    return state.timer
  },
  getSnackbaronPassword: (state) => {
    return state.showSnackbar
  }
}

export default getters