// Auth GTM Event Tracker
// any event tracker related to Auth, pls add here,
// u can split it again if it exceed 300 lines
export const authEventList = {
  /* Login */
  loginEmail: {
    event: 'login_email',
    eventName: 'login_email',
    eventCategory: 'Masuk akun',
    eventAction: 'Click button masuk via Email',
  },
  loginGoogle: {
    event: 'login_google',
    eventName: 'login_google',
    eventCategory: 'Masuk akun',
    eventAction: 'Click button masuk via Google',
  },
  loginFacebook: {
    event: 'login_facebook',
    eventName: 'login_facebook',
    eventCategory: 'Masuk akun',
    eventAction: 'Click button masuk via Facebook',
  },
  loginApple: {
    event: 'login_apple',
    eventName: 'login_apple',
    eventCategory: 'Masuk akun',
    eventAction: 'Click button masuk via Apple',
  },
  forgotPassword: {
    event: 'login_forgetpassword',
    eventName: 'login_forgetpassword',
    eventCategory: 'Masuk akun',
    eventAction: 'Click link Lupa Password',
  },
  loginMaxAttempt: {
    event: 'login_maxattempt',
    eventName: 'login_maxattempt',
    eventCategory: 'Masuk akun',
    eventAction: 'Error message "Anda telah melakukan percobaan masuk 15 kali"',
  },
  loginFailed: {
    event: 'login_failed',
    eventName: 'login_failed',
    eventCategory: 'Masuk akun',
    eventAction: 'Error message "Anda telah gagal masuk 10 kali"',
  },
  loginSuccess: {
    event: 'login_sukses',
    eventName: 'login_sukses',
    eventCategory: 'Masuk akun',
    eventAction: 'User berhasil masuk akun',
  },

  /* Register */
  registerEmail: {
    event: 'daftar_email',
    eventName: 'daftar_email',
    eventCategory: 'Daftar akun',
    eventAction: 'Click button daftar via Email',
  },
  registerGoogle: {
    event: 'daftar_google',
    eventName: 'daftar_google',
    eventCategory: 'Daftar akun',
    eventAction: 'Click button daftar via Google',
  },
  registerFacebook: {
    event: 'daftar_facebook',
    eventName: 'daftar_facebook',
    eventCategory: 'Daftar akun',
    eventAction: 'Click button daftar via Facebook',
  },
  registerApple: {
    event: 'daftar_apple',
    eventName: 'daftar_apple',
    eventCategory: 'Daftar akun',
    eventAction: 'Click button daftar via Apple',
  },
  registerMaxAttempt: {
    event: 'daftar_maxattempt',
    eventName: 'daftar_maxattempt',
    eventCategory: 'Daftar akun',
    eventAction: 'Error message "Anda telah melakukan percobaan masuk 15 kali"',
  },
  registerSuccess: {
    event: 'daftar_sukses',
    eventName: 'daftar_sukses',
    eventCategory: 'Daftar akun',
    eventAction: 'User berhasil mendaftar akun',
  },

  /* Auth by Phone Number */
  resetNumber: {
    event: 'login_resetnumber',
    eventName: 'login_resetnumber',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Click hyperlink "Nomor saya sudah tidak aktif"',
  },
  OTPResendLink: {
    event: 'OTP_resend_link',
    eventName: 'OTP_resend_link',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Click hyperlink "kirim ulang"',
  },
  OTPResendSuccess: {
    event: 'OTP_resend_success',
    eventName: 'OTP_resend_success',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Muncul snackbar kode baru terkirim',
  },
  OTPVerificationFailed: {
    event: 'OTP_verification_failed',
    eventName: 'OTP_verification_failed',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Error message "kode verifikasi tidak sesuai"',
  },
  OTPExpired: {
    event: 'OTP_expired',
    eventName: 'OTP_expired',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Error message "masa berlaku OTP sudah berakhir"',
  },
  OTPMaxResend: {
    event: 'OTP_maxresend',
    eventName: 'OTP_maxresend',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Error message "Anda telah 5 kali mengirimkan kode verifikasi"',
  },
  OTPQontakFailed: {
    event: 'OTP_qontakfailed',
    eventName: 'OTP_qontakfailed',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Muncul snackbar gagal kirim OTP ke WA',
  },
  OTPAnotherMethod: {
    event: 'OTP_another_method',
    eventName: 'OTP_another_method',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Click hyperlink "masuk dengan metode lain"',
  },
  OTPVerification: {
    event: 'OTP_verification_button',
    eventName: 'OTP_verification_button',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Click button "verifikasi"',
  },
  OTPVerificationSuccess: {
    event: 'OTP_verification_success',
    eventName: 'OTP_verification_success',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Nomor telepon berhasil terverifikasi',
  },
  registerEmailFailed: {
    event: 'daftar_failed_email',
    eventName: 'daftar_failed_email',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'Error message "email sudah digunakan"',
  },
  registerPhoneSuccess: {
    event: 'daftar_success_phonenumber',
    eventName: 'daftar_success_phonenumber',
    eventCategory: 'Auth by Phone Number',
    eventAction: 'User berhasil daftar akun menggunakan phone number',
  },
}
