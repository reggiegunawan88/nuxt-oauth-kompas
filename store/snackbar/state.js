const state = () => ({
  /* show/hide snackbar */
  showSnackbarSendLink: false,
  showSnackbarSuccess: false,
  showSnackbarWarning: false,
  showSnackbarError: false,
  showSnackbarInfo: false,
  showSnackbarAchievement: false,

  /* snackbar success message (reusable) */
  snackbarSuccessDesc: '',

  /* snackbar warning message (reusable) */
  snackbarWarningDesc: '',

  /* snackbar error title and desc */
  snackbarErrorTitle: '',
  snackbarErrorDesc: '',

  /* snackbar info message (reusable) */
  snackbarInfoDesc: '',

  /* snackbar achievement message (reusable) */
  snackbarAchievementIcon: '',
  snackbarAchievementTitle: '',
  snackbarAchievementDesc: '',
})

export default state
