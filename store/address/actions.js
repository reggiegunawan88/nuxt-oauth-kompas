// const accessToken = this.$cookies?.get('kompas._token') // user access token
const actions = {
  // get user address
  getUserAddress({ commit }) {
    try {
      // Get user address data from Repository
      this.$repositories.address.getUserAddress(this.$cookies?.get('kompas._token')).then((response) => {
        commit('SET_USER_ADDRESS', response.data.data)
      })
    } catch (error) {
      console.error(error)
    }
  },
  getUpdatedAddress({ commit }, addressId) {
    try {
      // Get user indexed address data from idx
      this.$repositories.address.getIndexedAddress(this.$cookies?.get('kompas._token'), addressId).then((response) => {
        commit('SET_UPDATED_ADDRESS', response.data.data)
      })
    } catch (error) {
      console.error(error)
    }
  },
  // add new address
  addUserAddress(_context, data) {
    try {
      const res = this.$repositories.address.addUserAddress(this.$cookies?.get('kompas._token'), data)
      return res
    } catch (error) {
      console.log(error)
    }
  },
  // edit/update user address
  updateUserAddress(_context, data) {
    try {
      const res = this.$repositories.address.updateUserAddress(this.$cookies?.get('kompas._token'), data)
      return res
    } catch (error) {
      console.error(error)
    }
  },
  // set user main address
  setMainAddress(_context, data) {
    try {
      const res = this.$repositories.address.setMainAddress(this.$cookies?.get('kompas._token'), data)
      return res
    } catch (error) {
      console.error(error)
    }
  },
  // set temporary updated address
  setUpdatedAddress({ commit }, data) {
    commit('SET_UPDATED_ADDRESS', data)
  },
  // delete user address
  deleteUserAddress(_context, data) {
    try {
      const res = this.$repositories.address.deleteUserAddress(this.$cookies?.get('kompas._token'), data)
      return res
    } catch (error) {
      console.error(error)
    }
  },
}

export default actions
