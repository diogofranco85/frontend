import { get, post, put } from "~/utils/api";

export default {
  async GET_LIST({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);

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

    await get(`/farm/${payload}`, 'COM_TOKEN_USUARIO')
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
    if (payload.typeOperation !== 'edit') {
      await post('/farm', payload.data, 'COM_TOKEN_USUARIO')
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', 'Cliente incluído com sucesso');
        })
        .catch(() => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', 'Não foi possivél salvar os dados. Se persistir entre em contato com o suporte. ' + err.response.data.message);
        });
    } else {
      await put(`/farm/${payload.data.id}`, payload.data, 'COM_TOKEN_USUARIO')
        .then(() => {
          commit('setLoading', false);
          commit('setMessage', 'Cliente alterado com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', 'Não foi possivél salvar os dados. Se persistir entre em contato com o suporte. ' + err.response.data.message);
        })
    }
  }

}
