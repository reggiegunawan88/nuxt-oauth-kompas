import { eventTracker } from '~/assets/scripts/gtm/tracker'

const actions = {
  /* dispatch for OTP auth */

  /**
   * Send OTP to phone number
   * @param data: flag, phoneNumber
   */
  async sendOTPCode({ dispatch, commit }, data) {
    try {
      await this.$repositories.otp.sendOTPCode(data.flag, data.phoneNumber, data.countryCode).then((resp) => {
        /**
         * flag 1 -> register
         * flag 2 -> login
         */
        if (data.flag === 1) {
          dispatch('modal/hideModalAuth', '', { root: true })
          // otp type: register
          this.$router.push({ path: '/phone-verification/code', query: { otpType: 'register' } })
        } else {
          dispatch('modal/hideModalAuth', '', { root: true })
          // otp type: login
          this.$router.push({ path: '/phone-verification/code', query: { otpType: 'login' } })
        }
        commit('SET_OTP_TIMER', resp.data.data.countdown)
      })
    } catch (error) {
      eventTracker('OTPQontakFailed')
      dispatch('modal/hideModalAuth', '', { root: true })
      dispatch('snackbar/showSnackbarError', '', { root: true })
      dispatch('snackbar/setSnackbarErrorDesc', 'Kode verifikasi (OTP) gagal terkirim ke WhatsApp Anda. Silakan masuk dengan nomor atau metode lain.', { root: true })
    }
  },
  /**
   * Update phone number for user inactive phone number (click hyperlink on modal)
   * @param data: phoneNumber
   */
  async updatePhoneNumber({ dispatch, commit }, data) {
    try {
      await this.$repositories.otp.updatePhoneNumber(data.phoneNumber, data.countryCode).then((response) => {
        if (data.route === 'invalid-link') {
          commit('snackbar/SHOW_SNACKBAR_SENDLINK', true, { root: true })
        } else {
          dispatch('modal/hideModalAuth', '', { root: true })
          const maskedEmail = response.data.data.email
          this.$router.push({ path: '/phone-verification/send-link', query: { email: maskedEmail } })
        }
      })
    } catch (error) {
      commit('snackbar/SET_SNACKBAR_WARNING_DESC', 'Tautan verifikasi telah dikirim ke email Anda. Jika belum diterima, Anda dapat mengirim ulang tautan dalam 1 menit.', { root: true })
    }
  },
  /**
   * Send request for user updated phone number
   * @param data: user token, phoneNumber, flag
   */
  async sendUpdatedPhoneNumber(_context, data) {
    try {
      await this.$repositories.otp.sendUpdatedPhoneNumber(data.jwt, data.phoneNumber, data.countryCode, data.flag).then(() => {
        if (data.route !== 'account-security') {
          // otp type : updatePhoneNumber
          this.$router.push({ path: '/phone-verification/code', query: { otpType: 'updatePhoneNumber' } })
        }
      })
    } catch (error) {
      throw error
    }
  },
  /**
   * Resend OTP to phone number
   * @param data: flag, phone number
   * @returns API response
   */
  async resendOTPCode(_context, data) {
    const resp = await this.$repositories.otp.sendOTPCode(data.flag, data.phoneNumber, data.countryCode)
    return resp
  },
  /**
   * Submit OTP for verification
   * @param data: flag, phone number, otpCode
   * @returns API response
   */
  async submitOTPCode(_context, data) {
    const resp = await this.$repositories.otp.submitOTPCode(data.phoneNum, data.countryCode, data.otpCode)
    return resp
  },
  setOTPTimer({ commit }, value) {
    commit('SET_OTP_TIMER', value)
  },
  // for autofill email on login field
  saveEmailValue({ commit }, value) {
    commit('SAVE_EMAIL_VALUE', value)
  },
  decreaseTimer({ commit }) {
    commit('DECREASE_TIMER')
  },
}

export default actions
