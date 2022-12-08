import { getDeviceName, getDeviceType } from '~/components/utils/helper/device'

const v2 = '/api/v2'
/* API consumes for OTP */
export default ($axios) => ({
  /**
   * send OTP code
   * @param type -> flag (1 register || 2 login)
   * @param data -> phone number input
   */
  sendOTPCode(type, data, code) {
    return $axios.post(`${v2}/users/otp/send`, {
      phoneNumber: data,
      countryCode: code,
      flag: type,
    })
  },
  /**
   * submit OTP code
   * @param phoneNum -> phone number input
   * @param flagNum -> flag (1 register || 2 login)
   * @param otpCode -> otp code input
   */
  submitOTPCode(phoneNum, country, otpCode) {
    return $axios.post(`${v2}/users/otp/check`, {
      phoneNumber: phoneNum,
      countryCode: country,
      otp: otpCode,
      device: getDeviceName(),
      deviceType: getDeviceType(),
      docReferrer: '',
    })
  },

  /**
   * Send request to update user inactive phone number
   * @param phoneNum -> phone number input
   */
  updatePhoneNumber(phoneNum, country) {
    return $axios.post(`${v2}/users/update-phone-number`, {
      phoneNumber: phoneNum,
      countryCode: country,
    })
  },

  /**
   * Send updated phone number request
   * @param jwt => user token
   * @param phoneNum => phone number input
   * @param code => country code 
   * @param flagNum  -> flag (1: verify user phone num || 2: update user phone num)
   */
  sendUpdatedPhoneNumber(jwt, phoneNum, code, flagNum) {
    return $axios.post(
      `${v2}/users/otp/send-change-phone`,
      {
        phoneNumber: phoneNum,
        countryCode: code,
        flag: flagNum,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
})
