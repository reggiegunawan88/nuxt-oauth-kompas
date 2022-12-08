const actions = {
  // get authorization code
  async getListTransaction({ commit }) {
    commit('SET_LIST_TRANSACTION_LOADING', true)

    try {
      const response = await this?.$repositories.transaction.listTransaction()
      commit('SET_LIST_TRANSACTION', response.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LIST_TRANSACTION_LOADING', false)
    }
  },
}
export default actions
