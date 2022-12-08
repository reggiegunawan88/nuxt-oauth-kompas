const actions = {
  toggleTicketDetail({ commit }, value) {
    commit('SET_TOGGLE_TICKET_DETAIL', value)
  },

  // get authorization code
  async getListEventTicket({ commit }, data) {
    commit('SET_LIST_TICKET_LOADING', true)

    try {
      const response = await this?.$repositories.myProduct.listEventTicket(this.$cookies?.get('kompas._token'), data)
      const params = {
        list: response.data.data.tickets,
        next: data.next,
      }
      commit('SET_LIST_TICKET', params)
      commit('SET_LIST_TICKET_NEXT', response.data.data.next)
      commit('SET_LIST_TICKET_LOAD_MORE', response.data.data.loadMore)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LIST_TICKET_LOADING', false)
    }
  },
}
export default actions
