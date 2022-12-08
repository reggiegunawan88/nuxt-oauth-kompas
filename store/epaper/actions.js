const actions = {
  // get E-Paper Data
  async getNewEpaper({ commit }) {
    try {
      await this.$repositories.epaper.getNewEpaperData().then((response) => {
        commit('SET_EPAPER_DATA', response.data)
      })
    } catch (error) {
      console.log(error)
    }
  },
}

export default actions
