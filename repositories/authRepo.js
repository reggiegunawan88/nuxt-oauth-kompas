import { getDeviceName, getDeviceType } from '~/components/utils/helper/device'

const v1 = '/api/v1'
const v2 = '/api/v2'

export default ($axios) => ({
  /* API consumes for auth */
  // check login type (email or phoneNum)
  checkLoginStatus(loginType, data) {
    return $axios.post(`${v2}/users/check`, {
      type: loginType,
      value: data,
    })
  },
  endpointGoogle(stateCode, token, prevUrl) {
    return $axios.post(`${v1}/login/google`, {
      state: stateCode,
      accessToken: token,
      docReferrer: prevUrl,
      device: getDeviceName(),
      deviceType: getDeviceType(),
    })
  },
  endpointFB(token, prevUrl) {
    return $axios.post(`${v1}/login/facebook`, {
      accessToken: token,
      docReferrer: prevUrl,
      device: getDeviceName(),
      deviceType: getDeviceType(),
    })
  },
  endpointApple(token, prevUrl) {
    return $axios.post(`${v1}/login/apple`, {
      accessToken: token,
      docReferrer: prevUrl,
      device: getDeviceName(),
      deviceType: getDeviceType(),
    })
  },
  sendVerificationEmail(token, emailVal) {
    return $axios.post(
      '/api/v1/register/verification/send',
      {
        email: emailVal,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
  },
  verifyUser(jwt) {
    return $axios.put(
      '/api/v1/register/verification',
      {},
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
  checkJWT(jwt) {
    return $axios.get(`${v1}/tokens/check`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  logout(val) {
    return $axios.post(`${v1}/logout`, {
      refreshToken: val.state.refreshToken,
    })
  },
  cancelRegister(jwt) {
    return $axios.delete(`${v1}/register/cancel`, {
      data: { token: jwt },
    })
  },
})
