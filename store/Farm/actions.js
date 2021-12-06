import { get, post, put } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await get(`/farm/${payload.id}/list`, 'COM_TOKEN_USUARIO')
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

    await get(`/farm/${payload}/find`, 'COM_TOKEN_USUARIO')
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

  async GET_CLIENT({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');

    get(`client/${payload}/find`, 'COM_TOKEN_USUARIO')
      .then(response => {
        commit('setClient', response.data.result);
        commit('setLoading', false);
        commit('setError', false);
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response.data.message);
      })
  },

  async SET_DATA({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    if (payload.typeOperation !== 'edit') {
      await post('/farm/create', payload.data, 'COM_TOKEN_USUARIO')
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
      await put(`/farm/${payload.data.id}/edit`, payload.data, 'COM_TOKEN_USUARIO')
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

  async LIMPAR_MENSAGEM({ commit }) {
    commit('setMessage', '');
    commit('setError', false);
  }

}
