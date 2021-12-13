
export default {
  setAverage(state, payload) {
    console.log('average', payload)
    state.average = payload;
  },

  setHoursDay(state, payload) {
    console.log('setHoursDay', payload)
    state.hoursDay = payload;
  },

  setCubicMeterDay(state, payload) {
    console.log('setCubicMeterDay', payload)
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
