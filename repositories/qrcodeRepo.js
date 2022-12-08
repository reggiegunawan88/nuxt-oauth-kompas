const resource = '/api/v1'
/* API consumes for Qcode */
export default ($axios) => ({
  // get authorization code
  checkQrcode(params) {
    return $axios.get(`${resource}/qrc/scan`, {
      params: { ...params },
    })
  },
  checkQrcodeValidation(jwt, params) {
    return $axios.get(`${resource}/qrc/validate`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { ...params },
    })
  },
  // submit validation form
  submitValidationForm(jwt, params) {
    return $axios.post(
      `${resource}/qrc/update-data`,
      {
        ...params,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
})
