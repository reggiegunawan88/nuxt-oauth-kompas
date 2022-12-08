const actions = {
  // get authorization code
  async getLatestArticles({ commit }) {
    commit('SET_LATEST_ARTICLES_LOADING', true)

    try {
      const response = await this?.$repositories.onboarding.getLatestArticles(this.$cookies?.get('kompas._token'))
      commit('SET_LATEST_ARTICLES', response.data.result)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LATEST_ARTICLES_LOADING', false)
    }
  },
  async checkOnboarding({ commit }) {
    try {
      await this.$repositories.onboarding.checkOnboarding(this.$cookies.get('kompas._token')).then((response) => {
        commit('SHOW_ONBOARDING', response.data.data.isOnboarding)
        commit('SET_MEMBERSHIP', response.data.data.isMembership)
      })
    } catch (error) {
      console.log(error)
    }
  },
  async sendWhatsappMsg(_context, data) {
    const response = await this.$repositories.onboarding.sendWhatsapp(this.$cookies.get('kompas._token'), data.phoneNumber, data.countryCode, data.isOnboarding, data.isSubber)
    return response
  },
}

export default actions
