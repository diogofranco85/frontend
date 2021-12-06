
export default {
  setClient(state, payload) {
    state.client = payload;
  },

  setFarm(state, payload) {
    state.farm = payload;
  },

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
