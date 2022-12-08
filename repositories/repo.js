import userDataRepo from '~/repositories/userDataRepo'
import authRepo from '~/repositories/authRepo'
import ssoRepo from '~/repositories/ssoRepo'
import addressRepo from '~/repositories/addressRepo'
import myProductRepo from '~/repositories/myProductRepo'
import onboardingRepo from '~/repositories/onboardingRepo'
import transactionRepo from '~/repositories/transactionRepo'
import qrcodeRepo from '~/repositories/qrcodeRepo'
import epaperRepo from '~/repositories/epaperRepo'
import otpRepo from '~/repositories/otpRepo'

export default ($axios) => ({
  user: userDataRepo($axios),
  auth: authRepo($axios),
  sso: ssoRepo($axios),
  address: addressRepo($axios),
  myProduct: myProductRepo($axios),
  onboarding: onboardingRepo($axios),
  transaction: transactionRepo($axios),
  qrcode: qrcodeRepo($axios),
  epaper: epaperRepo($axios),
  otp: otpRepo($axios),
})
