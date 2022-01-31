
export default {
  setAverage(state, payload) {

    state.average = payload;
  },

  setHoursDay(state, payload) {

    state.hoursDay = payload;
  },

  setCubicMeterDay(state, payload) {

    state.cubicMeterDay = payload;
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
