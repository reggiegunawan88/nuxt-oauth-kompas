const mutations = {
  SHOW_SNACKBAR_SENDLINK(state, value) {
    state.showSnackbarSendLink = value
  },
  SHOW_SNACKBAR_SUCCESS(state, value) {
    state.showSnackbarSuccess = value
  },
  SHOW_SNACKBAR_WARNING(state, value) {
    state.showSnackbarWarning = value
  },
  SHOW_SNACKBAR_ERROR(state) {
    state.showSnackbarError = true
  },
  HIDE_SNACKBAR_ERROR(state) {
    state.showSnackbarError = false
  },
  SHOW_SNACKBAR_INFO(state, value) {
    state.showSnackbarInfo = value
  },
  SHOW_SNACKBAR_ACHIEVEMENT(state, value) {
    state.showSnackbarAchievement = value
  },

  /* snackbar success msg */
  SET_SNACKBAR_DESC(state, value) {
    state.snackbarSuccessDesc = value
  },

  /* snackbar warning msg */
  SET_SNACKBAR_WARNING_DESC(state, value) {
    state.snackbarWarningDesc = value
  },

  /* set snackbar error title and des */
  SET_SNACKBAR_ERROR_TITLE(state, value) {
    state.snackbarErrorTitle = value
  },
  SET_SNACKBAR_ERROR_DESC(state, value) {
    state.snackbarErrorDesc = value
  },

  /* snackbar info msg */
  SET_SNACKBAR_INFO_DESC(state, value) {
    state.snackbarInfoDesc = value
  },
  /* snackbar info msg */
  SET_SNACKBAR_ACHIEVEMENT_ICON(state, value) {
    state.snackbarAchievementIcon = value
  },
  SET_SNACKBAR_ACHIEVEMENT_TITLE(state, value) {
    state.snackbarAchievementTitle = value
  },
  SET_SNACKBAR_ACHIEVEMENT_DESC(state, value) {
    state.snackbarAchievementDesc = value
  },
}

export default mutations
