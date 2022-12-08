const resource = '/api/v1'

export default ($axios) => ({
  // get user address list
  getUserAddress(jwt) {
    return $axios.get(`${resource}/users/addresses`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  // get user address from list by index
  getIndexedAddress(jwt, addressId) {
    return $axios.get(`${resource}/users/addresses/${addressId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
  },
  // create new user address
  addUserAddress(jwt, data) {
    return $axios.post(
      `${resource}/users/addresses`,
      {
        firstName: data.firstName,
        lastName: data.lastName,
        label: data.label,
        phoneNumber: data.phoneNumber,
        province: data.province,
        city: data.city,
        district: data.district,
        village: data.village,
        postalCode: data.postalCode,
        address: data.address,
        isMainAddress: data.isMainAddress,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
  // update user address
  updateUserAddress(jwt, data) {
    return $axios.put(
      `${resource}/users/addresses`,
      {
        addressId: data.addressId,
        firstName: data.firstName,
        lastName: data.lastName,
        label: data.label,
        phoneNumber: data.phoneNumber,
        province: data.province,
        city: data.city,
        district: data.district,
        village: data.village,
        address: data.address,
        postalCode: data.postalCode,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
  // set user main address
  setMainAddress(jwt, id) {
    return $axios.put(
      `${resource}/users/addresses/main`,
      {
        addressId: id,
      },
      {
        headers: { Authorization: `Bearer ${jwt}` },
      },
    )
  },
  // delete user address
  deleteUserAddress(jwt, id) {
    return $axios.delete(`${resource}/users/addresses`, {
      headers: { Authorization: `Bearer ${jwt}` },
      data: {
        addressId: id,
      },
    })
  },
})
