const resource = '/api/v1'
/* API consumes for SSO */
export default ($axios) => ({
  // get authorization code
  ssoAuthorizationCode(jwt, params) {
    return $axios.get(`${resource}/sso/code`, {
      headers: { Authorization: `Bearer ${jwt}` },
      params: { ...params },
    })
  },
  // add new sso linking
  ssoLinking(params) {
    return $axios.post(`${resource}/sso`, null, {
      params: {
        client_id: params.client_id,
        client_secret: params.client_secret,
        code: params.code,
        grant_type: params.grant_type,
      }
    })
  },
  // confirm sso linking
  confirmSsoLinking(data) {
    return $axios.post(`${resource}/sso/confirm`, {
      ...data,
    })
  },
  // get sso list
  getSSOList(token) {
    return $axios.get(`${resource}/sso/list`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  revokeSSO(token, id) {
    return $axios.delete(`${resource}/sso/revoke`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        clientId: id,
      },
    })
  },
})
