import { get } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await get(`/hydrometer/list/by/meter`, 'COM_TOKEN_USUARIO', payload)
      .then(response => {
        const { result } = response.data;
        commit("setData", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err?.response?.data?.message || err?.message);
      });
  },

  async CLEAR_DATA({ commit }) {
    commit("setData", []);
    commit('setError', false);
    commit('setMessage', '');
  },

  async LIMPAR_MENSAGEM({ commit }) {
    commit('setLoading', false);
    commit('setError', false);
    commit('setMessage', '');
  }

}
