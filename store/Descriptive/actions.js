import { get } from "~/utils/api";

export default {
  GET_DATA: async ({ commit }, payload) => {
    try {
      commit('setLoading', true);
      commit('setError', false);

      const { data } = await get(`/descriptives/list`, 'COM_TOKEN_USUARIO');
      commit('setData', data.result);

      commit('setLoading', false);
    } catch (err) {
      commit('setMessage', err.response.data.message);
      commit('setLoading', false);
      commit('setError', true)
    }
  },

  async GET_ITEM({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);

    await get(`/descriptives/${payload}/find`, 'COM_TOKEN_USUARIO')
      .then(response => {
        const { result } = response.data;
        commit("setItem", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err?.response?.data?.message || err?.message);
      });
  },

  async SET_DATA({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    if (payload.typeOperation !== 'edit') {
      await post('/descriptives/create', payload.data, 'COM_TOKEN_USUARIO')
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', 'Cliente incluído com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        });
    } else {
      await put(`/descriptives/${payload.data.id}/edit`, payload.data, 'COM_TOKEN_USUARIO')
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', 'Cliente alterado com sucesso');
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
