const mutations = {
  SET_LIST_TRANSACTION(state, value) {
    state.transactionList.data = value
  },
  SET_LIST_TRANSACTION_LOADING(state, value) {
    state.transactionList.isLoading = value
  },
}

export default mutations
