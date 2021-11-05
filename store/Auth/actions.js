import {get, post} from "~/utils/api";

export default {
    async GET_AUTHENTICATE({commit}, payload) {

      commit('setLoading', true);
      commit('setError', false);

      post('/session', payload, 'SEM_TOKEN_JSON')
        .then( response => {
            const {data} = response;
            commit('setAuth', true);
            commit("setToken", data.access_token);
            commit('setUser', data.user[0]);
        })
        .catch( err => {
            commit('setError', true);
            commit('setMessage',err?.response?.data?.message);
        });
    },

    GET_LOGOUT({commit}){
      commit('setAuth', false);
      commit('setToken', '');
      commit('setUser', []);
    }

}
