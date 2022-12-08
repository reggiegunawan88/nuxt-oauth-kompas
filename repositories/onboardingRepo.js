const resource = '/api/v1'

/* API consumes for onboarding */
export default ($axios) => ({
  // get latest articles
  getLatestArticles(jwt) {
    return $axios.get(`${resource}/article/list`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  /* check user onboarding status */
  checkOnboarding(jwt) {
    return $axios.get(`${resource}/users/onboarding/check`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  /* send whatsapp link */
  sendWhatsapp(jwt, phoneNum, code, onboardingVal, subberVal) {
    return $axios.put(
      `${resource}/users/onboarding`,
      {
        phoneNumber: phoneNum,
        countryCode: code,
        isOnboarding: onboardingVal,
        isSubber: subberVal,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
})
