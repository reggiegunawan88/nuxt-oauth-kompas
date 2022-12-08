const mutations = {
  /* detail akun pengguna kompas.id */
  SET_USERDATA(state, obj) {
    state.userData = obj
  },
  SET_MEMBERSHIP(state, obj) {
    state.userMembership = obj
  },
  SHOW_USER_PROMOTION(state, value) {
    state.userPromotion = value
  },

  /* data diri */
  SET_USERDATA_COMPLETE(state, value) {
    state.userDataComplete = value
  },
  SET_USER_YEAR(state, value) {
    state.userYear = value
  },
  SET_COUNTRY_LIST(state, value) {
    state.countryList = value
  },

  SET_PROVINCE(state, value) {
    state.provinceList = value
  },

  /* ubah sandi */
  SET_STATUS_CODE(state, value) {
    state.password.statusCode = value
  },

  /* perangkat */
  SET_USER_DEVICES(state, value) {
    state.userDevices = value
  },

  /* revoke perangkat */
  SET_REVOKE_DEVICES(state, value) {
    state.revokeDevices = value
  },

  /* device has been revoked by other user */
  DEVICE_HAS_BEEN_REVOKED(state, value) {
    state.deviceHasBeenRevoked = value
  },

  /* set if user is editing any form */
  IS_EDITING(state, value) {
    state.isEditing = value
  },

  /*
    User Access
    * set user access by membership status
    * set error response
    * set loading
  */
  SET_ACCESS(state, value) {
    state.userAccess.data = value
  },

  SET_ACCESS_ERROR(state, value) {
    state.userAccess.error = value
  },

  SET_ACCESS_LOADING(state, value) {
    state.userAccess.isLoading = value
  },

  /*
    User Notification
    * set user Notification
    * set error response
    * set loading
    * set next notifications list
  */
  SET_NOTIFICATION_LIST(state, value) {
    if (state.userNotification.list.length === 0) {
      state.userNotification.list = value
    } else {
      value.map((item) => state.userNotification.list.push(item))
    }
  },

  SET_NOTIFICATION_LIST_ISREAD(state, value) {
    state.userNotification.list.forEach((el) => {
      if (value === el.notificationId) {
        el.isRead = true
      } else if (value === 'all') {
        el.isRead = true
      }
    })
  },

  SET_NEXT_NOTIFICATION(state, value) {
    state.userNotification.next = value
  },

  SET_NOTIFICATION_COUNT(state, value) {
    state.userNotification.count = value
  },

  SHOW_LOAD_MORE(state, value) {
    state.userNotification.loadMore = value
  },

  SET_NOTIFICATION_LOADING(state, value) {
    state.userNotification.isLoading = value
  },
}

export default mutations
