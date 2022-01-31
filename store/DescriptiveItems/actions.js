import { get } from "~/utils/api";

export default {
  GET_DATA: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/descriptives/name/${payload.name}/items/find`, 'COM_TOKEN_USUARIO');
      commit('setData', data.result);

      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response.data.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },

  GET_FARM: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/farm/${payload}`, 'COM_TOKEN_USUARIO');

      commit('setFarm', data.result);

      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response.data.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },

  GET_BY_KEY: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/descriptives/item/key/${payload}`, 'COM_TOKEN_USUARIO');

      commit('setItem', data.result);

      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response.data.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },



  LIMPAR_MENSAGEM: ({ commit }) => {
    commit('setMessage', '');
    commit('setError', false);
  }
}
