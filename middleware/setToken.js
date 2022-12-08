export default async function ({ $cookies, $config, redirect, store }) {
  const refreshToken = await $cookies.get('kompas._token_refresh')
  store.dispatch('kompasAuth/setRefreshToken', refreshToken)

  // ref token exist (SSR)
  if (process.server) {
    if (refreshToken) {
      store.dispatch('kompasAuth/setRefreshToken', refreshToken)
    } else {
      redirect($config.homepageKompasAuth)
    }
  }
}
