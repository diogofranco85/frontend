import { get, post, put } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');

    await get(`/fullsection/farm/${payload}/find`, 'COM_TOKEN_USUARIO')
      .then(response => {
        const { result } = response.data;
        commit("setData", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err.response.data.message);
      });
  },

  async GET_ITEM({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);

    await get(`/fullsection/${payload}/find`, 'COM_TOKEN_USUARIO')
      .then(response => {
        const { result } = response.data;
        commit("setItem", result);
        commit('setLoading', false);
      })
      .catch(err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage', err.response.data.message);
      });
  },

  async GET_VALUE({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);

    await get(`/fullsection/getvalue`, 'COM_TOKEN_USUARIO', payload)
      .then(response => {
        const { result } = response.data;
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
    if (payload.typeOperation !== 'edit') {
      await post('/fullsection/create', payload.data, 'COM_TOKEN_USUARIO')
        .then((response) => {
          commit('setLoading', false);
          commit('setMessage', response.data.message || 'Medição incluída com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        });
    } else {
      await put(`/fullsection/${payload.data.id}/edit`, payload.data, 'COM_TOKEN_USUARIO')
        .then((response) => {
          commit('setLoading', false);
          commit('setMessage', response.data.message || 'Medição alterada com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        })
    }

  },
  CLEAR_DATA({ commit }) {
    commit('setLoading', true);
    commit('setData', []);
    commit('setError', false);
    commit('setLoading', false);

  }

}
