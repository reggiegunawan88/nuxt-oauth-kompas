const actions = {
  // get authorization code
  async getAuthorizationCode({ commit }, data) {
    commit('SET_AUTH_CODE_LOADING', true)

    try {
      const response = await this?.$repositories.sso.ssoAuthorizationCode(this.$cookies?.get('kompas._token'), data)
      commit('SET_AUTH_CODE', response.data)
    } catch (error) {
      commit('SET_AUTH_CODE_ERROR', error.response.data)
    } finally {
      commit('SET_AUTH_CODE_LOADING', false)
    }
  },
  // add new sso linking
  async addNewSsoLinking({ commit }, data) {
    commit('SET_SSO_LINKING_LOADING', true)

    try {
      const response = await this?.$repositories.sso.ssoLinking(data)
      commit('SET_SSO_LINKING', response.data)
    } catch (error) {
      commit('SET_SSO_LINKING_ERROR', error.response.data)
    } finally {
      commit('SET_SSO_LINKING_LOADING', false)
    }
  },
  // confirm sso linking
  async confirmSsoLinking({ commit }, data) {
    commit('SET_CONFIRM_SSO_LOADING', true)

    try {
      await this?.$repositories.sso.confirmSsoLinking(data)
    } catch (error) {
      commit('SET_CONFIRM_SSO_ERROR', error.response.data)
    } finally {
      commit('SET_CONFIRM_SSO_LOADING', false)
    }
  },
  // get sso list from repo API
  async getSSOList({ commit }) {
    try {
      await this?.$repositories.sso.getSSOList(this.$cookies.get('kompas._token')).then((response) => {
        commit('SET_SSO_LIST', response.data.data)
      })
    } catch (error) {
      console.error(error)
    }
  },
  // revoke user sso access
  async revokeSSO(_context, data) {
    try {
      await this.$repositories?.sso.revokeSSO(this.$cookies.get('kompas._token'), data)
    } catch (err) {
      console.error(err)
    }
  },
}
export default actions
