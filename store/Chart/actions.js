import { get } from "~/utils/api";

export default {
  async GET_SHEETS({ commit }) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');

    await get('/chart/dashboard/sheets', 'COM_TOKEN_USUARIO')
      .then(response => {
        const { result } = response.data;
        commit("setAverage", result.average);
        commit("setHoursDay", result.hoursDay);
        commit("setCubicMeterDay", result.cubicMeterDay);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err.response.data.message);
      });
  },

}
