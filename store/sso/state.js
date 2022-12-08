const state = () => ({
  // sso auth code
  ssoAuthCode: {
    error: {}, // untuk response error
    data: {}, // untuk response success
    isLoading: false, // indikator loading
  },
  // add new sso linking
  ssoLinking: {
    error: {}, // untuk response error
    data: {}, // untuk response success
    isLoading: false, // indikator loading
  },
  // confirm sso linking
  confirmSsoLinking: {
    error: {}, // untuk response error
    isLoading: false, // indikator loading
  },
  // sso 3rd party list
  ssoList: [],
})

export default state
