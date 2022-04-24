import { get, post, put } from "~/utils/api";

export default {
  GET_DATA: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/descriptives/name/${payload.name}/items/find`, 'COM_TOKEN_USUARIO');
      commit('setData', data.result);
      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response?.data?.message);
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

  async SET_DATA({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    if (payload.typeOperation !== 'edit') {
      await post('/descriptives/items/create', payload.data, 'COM_TOKEN_USUARIO')
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', 'Configuração incluído com sucesso');
          commit('setError', 'false');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        });
    } else {
      await put(`/descriptives/items/${payload.data.id}/edit`, payload.data, 'COM_TOKEN_USUARIO')
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', 'Configuração alterado com sucesso');
          commit('setError', 'false');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        })
    }
  },


  LIMPAR_MENSAGEM: ({ commit }) => {
    commit('setMessage', '');
    commit('setError', false);
  }
}
