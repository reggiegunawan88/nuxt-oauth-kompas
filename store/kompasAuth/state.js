const state = () => ({
  /* login */
  loginByEmail: false, // conditional rendering for login page -> show general auth/login component
  limitLogin: false, // indicator user login limit
  limitLoginMsg: '', // limit login message response
  authBlocked: false, // auth by email/phone attempt exceed max limit 15 times
  loginBlocked: false, // login success but user still blocked by timer
  loginBlockedMsg: '', // login blocked message
  warningIndicator: 0, // warning indicator login failed
  timer: 0, // time remaining before relog after 5th attempt

  /** indicator for user just created for social login and register
   * if true -> login
   * if false -> register
   */
  userJustCreated: null,

  /* jwt session */
  jwtActive: null, // jwt status for change password

  /* user verified status */
  userVerified: null,
  userLoggedOut: null,
  refreshToken: '',
  prevUrl: '', // store prev visited url before oauth
})

export default state
