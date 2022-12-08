/* helpers.ts => all reusable and repetitive called function */
import { validateEmptyValue } from './stringManipulation'

// validate entry point
export const validateEntryPointUrl = (url: any, config: any) => {
  if (!validateEmptyValue(url) && (url.includes('kompas.id') || url.includes('kompas.cloud'))) {
    return url
  } else {
    return config.redirect
  }
}

export const validateQueryParams = (obj: any, ...props: any) => {
  const result = { ...obj }
  props.forEach((props: string | number) => {
    delete result[props]
  })
  return result
}

// checking if email is social? -> contains google, fb, apple & email
export const checkSocialEmail = (router: any, social: any, userEmail: string, fromPage: string) => {
  if (social) {
    const socialStr = social.join(',')
    if (fromPage === 'register') {
      if (socialStr === 'email') {
        router.push({ path: '/register/email', query: { email: userEmail } })
      } else {
        router.push({ path: '/register/social', query: { social: socialStr, email: userEmail } })
      }
    } else {
      router.push({ path: '/login/social', query: { social: socialStr, email: userEmail } })
    }
  }
}

// clear cookies for both domain id and cloud
export const clearCookies = (cookies: any, config: any) => {
  // production and cloud domain
  cookies.remove('kantormu', { domain: config.cookieDomain })
  cookies.remove('kompas._token', { domain: config.cookieDomain })
  cookies.remove('kompas._token_refresh', { domain: config.cookieDomain })
  cookies.remove('kompas._status', { domain: config.cookieDomain })
}

// convert membership type text into code
export const getMembershipTypeCode = (code: any) => {
  let result
  switch (code) {
    case 'aktif_berlangganan':
      result = 1
      break
    case 'tidak_berlangganan':
      result = 2
      break
    default:
      result = 2
      break
  }
  return result
}

export const evenTicketStatus = (status: any) => {
  let result
  switch (status) {
    case 'Telah Berakhir':
      result = 'passed'
      break
    case 'Event Berbayar':
      result = 'paid'
      break
    case 'Event Gratis':
      result = 'free'
      break
    default:
      result = 'all'
      break
  }
  return result
}

/**
 * Delete cookie after CTA download page if kompas._isOnboarding cookie is exist
 * @param cookies for remove cookies
 * @param router for routing page
 * @param nextURL for redirect to next url
 */
export const deleteCookiesOnboarding = (cookies: any, config: any, router: any, nextURL: string) => {
  if (cookies.get('kompas._isOnboarding') !== undefined) {
    // to onboarding-subscription
    cookies.remove('kompas._isOnboarding', { domain: config.cookieDomain })
    router.push({ path: '/onboarding/subscription', query: { next: nextURL } })
  } else {
    // to onboarding-regon
    router.push({ path: '/onboarding/regon', query: { next: nextURL } })
  }
}

export const validateEmail = (email: string) => {
  // eslint-disable-next-line max-len
  const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // return false if email is valid
  if (exp.test(email)) {
    return false
  }
  return true
}

export const currency = (value: any) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export const orderStatus = (code: any) => {
  let result
  switch (code) {
    case 1:
      result = 'Dibatalkan'
      break
    case 2:
      result = 'Selesai'
      break
    case 3:
      result = 'Dibatalkan'
      break
    default:
      result = 'Menunggu Pembayaran'
      break
  }
  return result
}

export const orderStatusStyle = (code: any) => {
  let result
  switch (code) {
    case 1:
      result = 'bg-red-10 text-red-500'
      break
    case 2:
      result = 'bg-green-10 text-green-60'
      break
    case 3:
      result = 'bg-red-10 text-red-500'
      break
    default:
      result = 'bg-orange-10 text-orange-50'
      break
  }
  return result
}
