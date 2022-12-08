const resource = '/api/v1'

export default ($axios) => ({
  // get list event ticket
  listEventTicket(jwt, data) {
    return $axios.post(`${resource}/users/ticket`, data, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
})
