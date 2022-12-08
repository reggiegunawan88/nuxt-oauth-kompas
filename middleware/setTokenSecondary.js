export default async function ({ $cookies, store }) {
  const refreshToken = await $cookies.get('kompas._token_refresh')
  // ref token exist
  if (process.server) {
    store.dispatch('kompasAuth/setRefreshToken', refreshToken)
  }
}
