const mutations = {
  /* login */
  LOGIN_BY_EMAIL(state) {
    state.loginByEmail = true
  },
  CHANGE_EMAIL(state) {
    state.loginByEmail = false
  },
  SET_LIMIT_LOGIN(state, value) {
    state.limitLogin = value
  },
  SET_LIMIT_LOGIN_MSG(state, value) {
    state.limitLoginMsg = value
  },
  SET_AUTH_BLOCKED(state, value) {
    state.authBlocked = value
  },
  SET_LOGIN_BLOCKED(state, value) {
    state.loginBlocked = value
  },
  SET_LOGIN_BLOCKED_MSG(state, value) {
    state.loginBlockedMsg = value
  },
  SET_INDICATOR(state, value) {
    state.warningIndicator = value
  },
  SET_TIMER(state, value) {
    state.timer = value
  },
  SET_REFRESHTOKEN(state, value) {
    state.refreshToken = value
  },
  DECREASE_TIMER(state) {
    state.timer--
  },

  /* social login and register */
  SET_USER_CREATED(state, value) {
    state.userJustCreated = value
  },

  /* check jwt */
  SET_JWT_ACTIVE(state, value) {
    state.jwtActive = value
  },

  /* set user verified */
  VERIFY_USER(state, value) {
    state.userVerified = value
  },

  /* set user has already logged out */
  USER_LOGGED_OUT(state, value) {
    state.userLoggedOut = value
  },

  /* set prev url */
  SET_PREV_URL(state, value) {
    state.prevUrl = value
  },
}

export default mutations
