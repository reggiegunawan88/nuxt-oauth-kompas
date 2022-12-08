const state = () => ({
  passwordValue: '',

  // boolean validation
  isPasswordEmpty: false,

  // password strength score
  score: 0,

  // password reset canceled
  isPasswordResetCanceled: false,
})

export default state
