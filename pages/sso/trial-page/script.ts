import Vue from 'vue'

export default Vue.extend({
  layout: 'default',
  methods: {
    clickRedirect() {
      const origin = window.location.origin
      const query = {
        redirect_uri: origin,
        client_id: '3',
        state: 'borobudur_marathon',
        scope: 'nama lengkap, alamat, Alamat email dan mengirimkan pesan',
        response_type: 'code',
      }
      window.open(
        `${origin}/sso/check?redirect_uri=${query.redirect_uri}/sso/trial-page/landing-page&client_id=${query.client_id}&state=${query.state}&scope=${query.scope}&response_type=${query.response_type}`,
        'Kompas Authorization',
        'width=700,height=500',
      )
    }
  }
})
