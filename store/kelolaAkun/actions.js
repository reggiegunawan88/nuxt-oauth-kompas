const actions = {
  // for subscription information page
  async getAPIMyData(_context, data) {
    try {
      await this.$repositories?.user.getAPIMy(data.token, data.userGuid).then((resp) => {
        console.log(resp)
      })
    } catch (error) {
      console.log(error)
    }
  },
  // for manage account only (send exp date)
  async resendEmailVerification({ commit }, data) {
    try {
      await this.$repositories?.user.sendVerificationEmail(this.$cookies.get('kompas._token'), data.userEmail).then(() => {
        // show snackbar success send link
        commit('snackbar/SHOW_SNACKBAR_SENDLINK', true, { root: true })
        commit('snackbar/SHOW_SNACKBAR_WARNING', false, { root: true })
      })
    } catch (error) {
      console.error(error)
      // show snackbar 1 minutes limit
      commit('snackbar/SHOW_SNACKBAR_SENDLINK', false, { root: true })
      commit('snackbar/SHOW_SNACKBAR_WARNING', true, { root: true })
      commit('snackbar/SET_SNACKBAR_WARNING_DESC', 'Tautan verifikasi telah dikirim ke email Anda. Jika belum diterima, Anda dapat mengirim ulang tautan dalam 1 menit.', { root: true })
    }
  },
  // widget banner show/hide
  setUserVerified({ commit }, value) {
    commit('SET_USER_VERIFIED', value)
  },
  setUserDataComplete({ commit }, value) {
    commit('SET_USERDATA_COMPLETE', value)
  },

  isUserEditing({ commit }, value) {
    commit('IS_EDITING', value)
  },

  isNotificationRead({ commit }, value) {
    commit('SET_NOTIFICATION_LIST_ISREAD', value)
  },

  // change password detail akun
  async changePassword({ commit }, value) {
    try {
      await this.$repositories.user.changePassword(this.$cookies?.get('kompas._token'), value).then((response) => {
        commit('SET_STATUS_CODE', response.code)
      })
    } catch (err) {
      const code = err.response.status
      commit('SET_STATUS_CODE', code)
    }
  },

  // ubah user data pada detail akun ubah data
  async updateUserData({ dispatch }, value) {
    this.$axios.setHeader('Authorization', 'Bearer ' + this.$cookies.get('kompas._token'))
    try {
      await this.$repositories.user.updateUserData(value).then(() => {
        this.$router.push('/manage-account/account-detail/personal-data')
        dispatch('snackbar/showSnackbarSuccess', true, { root: true })
        dispatch('snackbar/setSnackbarDesc', 'Berhasil mengubah data diri Anda!', { root: true })
      })
    } catch (err) {
      console.error(err)
    }
  },

  /* detail akun pengguna kompas.id */
  // get user data
  getUserData({ commit }) {
    // Get all user data from Repository
    this.$repositories.user.getAllUserData(this.$cookies?.get('kompas._token')).then((response) => {
      // inject user data into store
      commit('SET_USERDATA', response.data.data)
      // validate if user data is completed
      commit('SET_USERDATA_COMPLETE', response.data.data.userCompleted)
      // inject year into store
      commit('SET_USER_YEAR', response.data.data.createDate.year)
    })
  },

  // get user membership
  async getMembership({ commit }) {
    this.$axios.setHeader('Authorization', 'Bearer ' + this.$cookies.get('kompas._token'))
    // Get user membership data from Repository
    await this?.$repositories.user.membership().then((response) => {
      commit('SET_MEMBERSHIP', response.data.data.result.user)
    })
  },

  // get country
  async getAllCountry({ commit }) {
    try {
      await this?.$repositories.user.getAllCountry().then((response) => {
        commit('SET_COUNTRY_LIST', response.data.data)
      })
    } catch (err) {
      console.log(err)
    }
  },

  // get all province
  async getAllProvince({ commit }) {
    try {
      await this?.$repositories.user.getAllProvince().then((response) => {
        commit('SET_PROVINCE', response.data.data)
      })
    } catch (err) {
      console.error(err)
    }
  },

  // get all user logged in devices
  async getUserDevices({ commit }) {
    try {
      await this?.$repositories.user.getUserDevices(this.$cookies?.get('kompas._token')).then((response) => {
        commit('SET_USER_DEVICES', response.data.data)
      })
    } catch (err) {
      console.error(err)
    }
  },

  // revoke single user device
  async revokeSingleDevice(_context, data) {
    const resp = await this?.$repositories.user.revokeSingleDevice(data.token, data.data)
    return resp
  },

  deviceHasBeenRevoked({ commit }, value) {
    commit('DEVICE_HAS_BEEN_REVOKED', value)
  },

  setRevokeDevices({ commit }, value) {
    commit('SET_REVOKE_DEVICES', value)
  },

  // revoke all user devices
  async revokeAllDevices(_context, data) {
    try {
      await this?.$repositories.user.revokeAllDevices(data.token)
    } catch (err) {
      console.error(err)
    }
  },

  // get user access
  async getUserAccess({ commit }, data) {
    commit('SET_ACCESS_LOADING', true)

    try {
      const response = await this?.$repositories.user.getUserAccess(this.$cookies?.get('kompas._token'), data)
      commit('SET_ACCESS', response.data.data?.listAccess)
    } catch (error) {
      commit('SET_ACCESS_ERROR', error.response.data)
    } finally {
      commit('SET_ACCESS_LOADING', false)
    }
  },

  // get all user notification
  async getUserNotification({ commit }, data) {
    commit('SET_NOTIFICATION_LOADING', true)
    try {
      const response = await this?.$repositories.user.getUserNotification(this.$cookies?.get('kompas._token'), data)
      commit('SET_NOTIFICATION_LIST', response.data.data.notificationList)
      commit('SET_NEXT_NOTIFICATION', response.data.data.next)
      commit('SET_NOTIFICATION_COUNT', response.data.data.notificationCount)
      commit('SHOW_LOAD_MORE', response.data.data.loadMore)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_NOTIFICATION_LOADING', false)
    }
  },

  // read user notification
  async userNotificationIsRead(_context, data) {
    try {
      const response = await this?.$repositories.user.userNotificationIsRead(this.$cookies?.get('kompas._token'), data)
      return response
    } catch (error) {
      console.log(error)
    }
  },
}
export default actions
