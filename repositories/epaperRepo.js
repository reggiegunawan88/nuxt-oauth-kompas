/* API consumes for Epaper */
const resource = '/epaper'
export default ($axios) => ({
  // get Epaper Data
  getNewEpaperData(params) {
    return $axios.get(`${resource}/new`, {
      params: { ...params },
    })
  },
})
