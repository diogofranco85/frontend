import {get} from "~/utils/api";

export default {
    async GET_LIST({commit}) {

      commit('setLoading', true);
      commit('setError', false);

      get('/client', 'COM_TOKEN_USUARIO')
        .then( response => {
            const {result} = response.data;
            commit("setData",result);
            commit('setLoading', false);
        })
        .catch( err => {
            commit('setError', true);
            commit('setLoading', false);
            commit('setMessage',err?.response?.data?.message || err?.message);
        });
    },

  async GET_ITEM({commit}, payload){
    commit('setLoading', true);
    commit('setError', false);

    get(`/client/${payload}`, 'COM_TOKEN_USUARIO')
      .then( response => {
        const {result} = response.data;
        commit("setItem", result);
        commit('setLoading', false);
      })
      .catch( err => {
        commit('setError', true);
        commit('setLoading', false);
        commit('setMessage',err?.response?.data?.message || err?.message);
      });
  }

}
