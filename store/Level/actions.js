import { get, post, put } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await get(`/level/farm/${payload}/list`, 'COM_TOKEN_USUARIO')
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

  async GET_ITEM({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await get(`/level/${payload}/find`, 'COM_TOKEN_USUARIO')
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
      await post('/level/create', payload.data, 'COM_TOKEN_USUARIO')
        .then((response) => {
          commit('setLoading', false);
          commit('setMessage', response.data.message || 'Usuário incluído com sucesso');
        })
        .catch((err) => {
          console.log('error');
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response?.data?.message || err);
        });
    } else {
      await put(`/level/${payload.data.id}/edit`, payload.data, 'COM_TOKEN_USUARIO')
        .then((response) => {
          commit('setLoading', false);
          commit('setMessage', response.data.message || 'Usuário alterado com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message || err);
        })
    }
  }

}
