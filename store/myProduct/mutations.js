const mutations = {
  SET_LIST_TICKET(state, value) {
    if (value.list) {
      // iterate to create flag for toggle accordion
      value.list.forEach((el) => (el.toggled = false))
    }
    if (state.ticket.list.length === 0 || value.next === '') {
      state.ticket.list = value.list
    } else {
      value.list.map((item) => state.ticket.list.push(item))
    }
  },
  SET_TOGGLE_TICKET_DETAIL(state, value) {
    state.ticket.list.forEach((el) => {
      if (value === el.ticketId) {
        el.toggled = !el.toggled
      }
    })
  },
  SET_LIST_TICKET_NEXT(state, value) {
    state.ticket.next = value
  },
  SET_LIST_TICKET_LOAD_MORE(state, value) {
    state.ticket.loadMore = value
  },
  SET_LIST_TICKET_LOADING(state, value) {
    state.ticket.isLoading = value
  },
}

export default mutations
