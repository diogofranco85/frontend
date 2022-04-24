
export default {
  setData(state, payload) {
    state.data = payload;
  },

  // setItem(state, payload) {
  //   state.item = payload;
  // },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setError(state, payload) {
    state.error = payload;
  },

  setMessage(state, payload) {
    state.message = payload;
  }
}
