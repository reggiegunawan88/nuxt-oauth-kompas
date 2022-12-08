const actions = {
  // scan QR code
  async scanQrcode(_context, data) {
    try {
      const response = await this?.$repositories.qrcode.checkQrcode(data)
      return response
    } catch (error) {
      // If code error redirect to error page
      const status = error.response.data.code
      if (status === 400) {
        this.$router.push('/qrcode/error')
      }
    }
  },
  // QR code validation
  async qrcodeValidation(_context, data) {
    const response = await this?.$repositories.qrcode.checkQrcodeValidation(this.$cookies?.get('kompas._token'), data)
    return response
  },

  // submit QR form
  async submitForm(_context, data) {
    try {
      const response = await this?.$repositories.qrcode.submitValidationForm(this.$cookies?.get('kompas._token'), data)
      return response
    } catch (error) {
      const status = error.response.data.code
      // If code error 403
      if (status === 403) {
        this.$router.push('/error?code=403')
      }
    }
  },
}
export default actions
