/* eslint-disable @typescript-eslint/no-unused-vars */
const actions = {
  /* login */
  async appleIDAuth() {
    // init AppleID config
    // eslint-disable-next-line no-undef
    AppleID.auth.init({
      clientId: 'cloud.kompas.account',
      scope: 'name email',
      redirectURI: this.$config.redirect_applesignin,
      usePopup: true,
    })

    // eslint-disable-next-line no-undef
    const idToken = await AppleID.auth.signIn()
    this.$router.push('/redirect?appleToken=' + idToken.authorization.id_token)
  },
  // socmed endpoint
  async GoogleAuth({ commit }, data) {
    await this?.$repositories.auth.endpointGoogle(data.state, data.token, data.docReferrer).then((response) => {
      if (response.code === 400) {
        this.$router.push('/error?code=400')
      } else {
        const resp = response.data.data
        commit('SET_USER_CREATED', resp.userCreated)
        localStorage.login_isSocial = resp.isSocial
        localStorage.login_isPassEmpty = resp.isPassEmpty
      }
    })
  },
  async FBAuth({ commit }, data) {
    await this?.$repositories.auth.endpointFB(data.token, data.docReferrer).then((response) => {
      if (response.code === 400) {
        this.$router.push('/error?code=400')
      } else {
        const resp = response.data.data
        commit('SET_USER_CREATED', resp.userCreated)
        localStorage.login_isSocial = resp.isSocial
        localStorage.login_isPassEmpty = resp.isPassEmpty
      }
    })
  },
  async AppleAuth({ commit }, data) {
    await this?.$repositories.auth.endpointApple(data.token, data.docReferrer).then((response) => {
      if (response.code === 400) {
        this.$router.push('/error?code=400')
      } else {
        const resp = response.data.data
        commit('SET_USER_CREATED', resp.userCreated)
        localStorage.login_isSocial = resp.isSocial
        localStorage.login_isPassEmpty = resp.isPassEmpty
      }
    })
  },
  // check login if email/phone num has registered before
  async checkLoginStatus(_context, data) {
    const resp = await this?.$repositories.auth.checkLoginStatus(data.loginType, data.value)
    return resp
  },
  // conditional rendering indicator for login page (show general auth/login component)
  loginByEmail({ commit }) {
    commit('LOGIN_BY_EMAIL')
  },
  changeEmail({ commit }) {
    commit('CHANGE_EMAIL')
  },

  // login warning
  setLimitLogin({ commit }, value) {
    commit('SET_LIMIT_LOGIN', value)
  },
  setLimitLoginMsg({ commit }, value) {
    commit('SET_LIMIT_LOGIN_MSG', value)
  },
  setAuthBlocked({ commit }, value) {
    commit('SET_AUTH_BLOCKED', value)
  },
  setLoginBlocked({ commit }, value) {
    commit('SET_LOGIN_BLOCKED', value)
  },
  setLoginBlockedMsg({ commit }, value) {
    commit('SET_LOGIN_BLOCKED_MSG', value)
  },
  // login state (<= 10 attempt)
  setIndicator({ commit }, value) {
    commit('SET_INDICATOR', value)
  },
  setTimer({ commit }, value) {
    commit('SET_TIMER', value)
  },
  setRefreshToken({ commit }, value) {
    commit('SET_REFRESHTOKEN', value)
  },
  decreaseTimer({ commit }) {
    commit('DECREASE_TIMER')
  },

  /* cancel user registration */
  async cancelRegister({ commit }, jwt) {
    // axios to endpoint
    await this.$repositories.auth.cancelRegister(jwt).then(() => {
      commit('snackbar/SHOW_SNACKBAR_SUCCESS', true, { root: true })
      commit('snackbar/SET_SNACKBAR_DESC', 'Pendaftaran Akun Berhasil Dibatalkan.', { root: true })
    })
  },
  /* send verification email */
  async resendEmailVerification({ commit }, data) {
    try {
      await this.$repositories?.auth.sendVerificationEmail(data.token, data.email).then(() => {
        // show snackbar success send link
        commit('snackbar/SHOW_SNACKBAR_SENDLINK', true, { root: true })
        commit('snackbar/SHOW_SNACKBAR_WARNING', false, { root: true })
      })
    } catch (err) {
      // show snackbar 1 minutes limit
      commit('snackbar/SHOW_SNACKBAR_SENDLINK', false, { root: true })
      commit('snackbar/SHOW_SNACKBAR_WARNING', true, { root: true })
      commit('snackbar/SET_SNACKBAR_WARNING_DESC', 'Tautan verifikasi telah dikirim ke email Anda. Jika belum diterima, Anda dapat mengirim ulang tautan dalam 1 menit.', { root: true })
    }
  },

  // verify user email to backend
  async verifyUser({ commit }, jwt) {
    try {
      await this.$repositories?.auth.verifyUser(jwt).then(() => {
        commit('VERIFY_USER', true)
        // redirect to entry point page
        window.location.href = this.$auth.$storage.getUniversal('prevUrl') + '&isVerified=true'
      })
    } catch (error) {
      const errCode = error.response.status
      // user already verified
      if (errCode === 409) {
        commit('VERIFY_USER', false)
      }
      // user already logged out
      if (errCode === 428) {
        commit('USER_LOGGED_OUT', true)
      }
      // token expired
      if (errCode === 401) {
        commit('SET_JWT_ACTIVE', false)
      }
      // email/user not found
      if (errCode === 404) {
        // if email not found, redirect to error page 404
        this.$router.push('/error?code=404')
      }
      // user logged out, redirect again to homepage login
      if (errCode === 428) {
        this.$router.push('/login')
      }
    }
  },
  /* jwt expired */
  async validateJWT({ commit }, token) {
    try {
      await this.$repositories.auth.checkJWT(token).then(() => {
        commit('SET_JWT_ACTIVE', true)
      })
    } catch (error) {
      commit('SET_JWT_ACTIVE', false)
    }
  },
  /* set prev visited url */
  setPrevUrl({ commit }, value) {
    commit('SET_PREV_URL', value)
  },

  /* logout */
  async logoutUser(refreshToken) {
    try {
      await this?.$repositories.auth.logout(refreshToken)
    } catch (error) {
      // error code 400 -> login
      if (error.response.code === 400) {
        this.$router.push('/login')
      }
    }
  },
}

export default actions
