const resource = '/api/v1'
export default ($axios) => ({
  // get user subscription data
  getAPIMy(jwt, guid) {
    return $axios.get(`/api2/show/${guid}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  // for manage account only
  sendVerificationEmail(jwt, userEmail) {
    return $axios.post(
      `${resource}/register/verification/send`,
      {
        email: userEmail,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
  // get All data (user detail data)
  getAllUserData(jwt) {
    return $axios.get(`${resource}/users/detail`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  // get user info (email verified)
  getUserInfo(jwt) {
    return $axios.get(`${resource}/users/info`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  getAllProvince() {
    return $axios.get('api/v1/countries/region/id') // -> indonesia
  },
  // refresh your lyfe
  refresh(token) {
    return $axios.$post(`${resource}/tokens/refresh`, {
      refreshToken: token,
    })
  },
  // are they part of us?
  membership() {
    return $axios.get(`${resource}/users/membership`, {})
  },
  // get all country
  getAllCountry() {
    return $axios.get(`${resource}/countries`, {})
  },
  // ubah data user
  updateUserData(value) {
    return $axios.$put(`${resource}/users`, value)
  },
  // ubah password detail akun
  changePassword(jwt, value) {
    return $axios.$put(
      `${resource}/users/password`,
      {
        oldPassword: value.current,
        newPassword: value.new,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
  // get user device
  getUserDevices(jwt) {
    return $axios.get(`${resource}/users/device`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  // revoke a single device
  revokeSingleDevice(jwt, data) {
    return $axios.$delete(`${resource}/users/device/revoke`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data: {
        ...data,
      },
    })
  },
  // revoke all device
  revokeAllDevices(jwt) {
    return $axios.$delete(`${resource}/users/device/revoke/all`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
  },
  // get user access
  getUserAccess(jwt, params) {
    return $axios.get(`${resource}/users/accesses`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { ...params },
    })
  },
  // get user notification
  getUserNotification(jwt, params) {
    return $axios.get(`${resource}/users/notification`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { ...params },
    })
  },
  // notification is read
  userNotificationIsRead(jwt, id) {
    return $axios.put(
      `${resource}/users/notification/read`,
      {
        notificationId: id,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
})
