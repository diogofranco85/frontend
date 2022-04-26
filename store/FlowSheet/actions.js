import { get, post, del } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');

    await get(`/flowsheets/list/`, 'COM_TOKEN_USUARIO', payload)
      .then(response => {
        const { result } = response.data;
        commit("setData", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err.response?.data?.message);
      });
  },

  async GET_SPENT({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');

    await get(`/flowsheets/sumspent`, 'COM_TOKEN_USUARIO', payload)
      .then(response => {
        const { result } = response.data;
        console.log(result);
        commit("setItem", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err.response.data.message);
      });
  },

  async SET_DATA({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await post('/flowsheets/create', payload, 'COM_TOKEN_USUARIO')
      .then((response) => {
        commit('setLoading', false);
        commit('setMessage', 'Dados cadastrado com sucesso');
      })
      .catch((err) => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response.data.message);
      });
  },

  async SET_DEL({ commit }, payload) {
    commit('setMessage', '');
    commit('setError', false);
    commit('setLoading', true);
    del(`/flowsheets/${payload}/delete`, 'COM_TOKEN_USUARIO')
      .then(() => {
        commit('setLoading', false);
        commit('setError', false);
        commit('setMessage', 'Dados excluído com sucesso');
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response.data.message || err);
      })
  },

  CLEAR_DATA({ commit }) {
    commit('setMessage', '');
    commit('setError', false);
    commit('setLoading', false);
    commit("setData", []);
    commit("setItem", null);
  }

}
