export default ($axios) => ({
  // get list event ticket
  listTransaction() {
    return $axios.get('https://private-522a2-kompasinstitute.apiary-mock.com/order')
  },
})
