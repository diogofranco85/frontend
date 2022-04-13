import { get, post } from "~/utils/api";

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

  GET_BY_KEY: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const sendData = {
        name: payload
      }

      const { data } = await post(`/descriptives/item/key`, sendData, 'COM_TOKEN_USUARIO');
      commit('setData', data.result);

      commit('setLoading', false);
    } catch (err) {
      console.log(err);
      commit('setMessage', err?.response?.data?.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },

  GET_ITEM: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/descriptives/items/${payload}/find`, 'COM_TOKEN_USUARIO');

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
