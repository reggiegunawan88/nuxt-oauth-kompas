// Interceptor to handle error in our brain circuit
// Will refresh our lyfe
import { excludedError, excludeErrRedirect } from '~/assets/scripts/constants/excludedErr'
export default function ({ $axios, $cookies, app, store, $config }) {
  $axios.onResponseError((err) => {
    const code = parseInt(err.response && err.response.status)
    const originalRequest = err.config
    const originUrl = originalRequest.url
    const method = originalRequest.method
    let routeUrl = '/error?code=' + (code !== undefined ? code : 500)
    const exclErr = excludedError.some((e) => originUrl.includes(e))
    const exclErrRedirect = excludeErrRedirect.some((e) => originUrl.includes(e))

    /* API url exception */
    if (!exclErr) {
      if (code === 401) {
        originalRequest.__isRetryRequest = true
        return new Promise((resolve) => {
          $axios
            .$post(`/api/v1/tokens/refresh`, {
              refreshToken: store.state.kompasAuth.refreshToken,
            })
            .then((response) => {
              $cookies?.remove('kompas._token', { domain: $config.cookieDomain })
              $cookies?.set('kompas._token', response.data.accessToken, { domain: $config.cookieDomain, maxAge: 60 * 15 })
              originalRequest.headers.Authorization = 'Bearer ' + response.data.accessToken
              resolve(response)
            })
            .catch(() => {
              /* clear local storage if error catch */
              localStorage.clear()
              const routeUrl = window.location.origin
              return (window.location.href = `${routeUrl}/logout?clear=true`)
            })
        })
          .then(() => {
            return $axios(originalRequest)
          })
          .catch((err) => {
            if (exclErrRedirect) {
              // throw err as response if endpoint is includes on exclErrRedirect
              throw err
            }

            if (err.response.status) {
              routeUrl = '/error?code=' + err.response.status
              return app.router.push(routeUrl)
            }
            return app.router.push('/error?code=500')
          })
      } else if (exclErrRedirect) {
        throw err
      }
    }
    return app.router.push(routeUrl)
  })
}
