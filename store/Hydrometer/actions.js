import { get, post, put, del } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await get(`/hydrometer/meter/${payload}/list`, 'COM_TOKEN_USUARIO')
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
    await get(`/hydrometer/${payload}/find`, 'COM_TOKEN_USUARIO')
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
    await post('/hydrometer/create', payload.data, 'COM_TOKEN_USUARIO')
      .then((response) => {
        commit('setLoading', false);
        commit('setMessage', response.data.message || 'Hidrometro incluído com sucesso');
      })
      .catch((err) => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response?.data?.message || err);
      });
  },

  async SET_DEL({ commit }, payload) {
    commit('setMessage', '');
    commit('setError', false);
    commit('setLoading', true);
    del(`/hydrometer/${payload}/delete`, 'COM_TOKEN_USUARIO')
      .then(() => {
        commit('setLoading', false);
        commit('setError', false);
        commit('setMessage', 'Hidrometro excluido com sucesso');
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response.data.message || err);
      })
  },

  async LIMPAR_MENSAGEM({ commit }) {
    commit('setLoading', false);
    commit('setError', false);
    commit('setMessage', '');
  }

}
