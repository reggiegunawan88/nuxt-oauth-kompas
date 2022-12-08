const mutations = {
  // Latest Article
  SET_LATEST_ARTICLES(state, value) {
    state.latestArticles.list = value
  },
  SET_LATEST_ARTICLES_LOADING(state, value) {
    state.latestArticles.isLoading = value
  },

  SHOW_ONBOARDING(state, value) {
    state.showOnboarding = value
  },
  SET_MEMBERSHIP(state, value) {
    state.membership = value
  },
  SET_ERROR_CODE(state, value) {
    state.errorCode = value
  },
}

export default mutations
