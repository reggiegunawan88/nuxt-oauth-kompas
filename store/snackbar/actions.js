const actions = {
  /* show/hide snackbar send link, success and time limit */
  showSnackbarSendLink({ commit }, value) {
    commit('SHOW_SNACKBAR_SENDLINK', value)
  },
  showSnackbarSuccess({ commit }, value) {
    commit('SHOW_SNACKBAR_SUCCESS', value)
  },
  showSnackbarWarning({ commit }, value) {
    commit('SHOW_SNACKBAR_WARNING', value)
  },
  showSnackbarError({ commit }) {
    commit('SHOW_SNACKBAR_ERROR')
  },
  hideSnackbarError({ commit }) {
    commit('HIDE_SNACKBAR_ERROR')
  },
  showSnackbarInfo({ commit }, value) {
    commit('SHOW_SNACKBAR_INFO', value)
  },
  showSnackbarAchievement({ commit }, value) {
    commit('SHOW_SNACKBAR_ACHIEVEMENT', value)
  },

  /* set snackbar msg on action (success) */
  setSnackbarDesc({ commit }, value) {
    commit('SET_SNACKBAR_DESC', value)
  },

  /* set snackbar msg on action (warning) */
  setSnackbarWarningDesc({ commit }, value) {
    commit('SET_SNACKBAR_WARNING_DESC', value)
  },

  /* set snackbar title and desc on action (error) */
  setSnackbarErrorTitle({ commit }, value) {
    commit('SET_SNACKBAR_ERROR_TITLE', value)
  },
  setSnackbarErrorDesc({ commit }, value) {
    commit('SET_SNACKBAR_ERROR_DESC', value)
  },

  /* set snackbar msg on action (info) */
  setSnackbarInfoDesc({ commit }, value) {
    commit('SET_SNACKBAR_INFO_DESC', value)
  },

  /* set snackbar msg on action (Achievement) */
  setSnackbarAchievementIcon({ commit }, value) {
    commit('SET_SNACKBAR_ACHIEVEMENT_ICON', value)
  },
  setSnackbarAchievementTitle({ commit }, value) {
    commit('SET_SNACKBAR_ACHIEVEMENT_TITLE', value)
  },
  setSnackbarAchievementDesc({ commit }, value) {
    commit('SET_SNACKBAR_ACHIEVEMENT_DESC', value)
  },
}

export default actions
