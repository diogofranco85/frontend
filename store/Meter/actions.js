import { get, post, put, del } from "~/utils/api";

export default {
  async GET_DATA({ commit }, payload) {

    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    await get(`/meter/farm/${payload}/find`, 'COM_TOKEN_USUARIO')
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
    commit('setMessage', '');
    await get(`/meter/${payload}/find`, 'COM_TOKEN_USUARIO')
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
      await post('/meter/create', payload, 'COM_TOKEN_USUARIO')
        .then((response) => {
          commit('setLoading', false);
          commit('setMessage', 'Horimetro cadastrado com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        });
    } else {
      await put(`/meter/${payload.data.id}/edit`, payload.data, 'COM_TOKEN_USUARIO')
        .then((response) => {
          commit('setLoading', false);
          commit('setMessage', 'Horimetro editado com sucesso');
        })
        .catch((err) => {
          commit('setLoading', false);
          commit('setError', true);
          commit('setMessage', err.response.data.message);
        })
    }
  },

  async SET_DEL({ commit }, payload) {
    commit('setMessage', '');
    commit('setError', false);
    commit('setLoading', true);
    del(`/level/${payload}/delete`, 'COM_TOKEN_USUARIO')
      .then(() => {
        commit('setLoading', false);
        commit('setError', false);
        commit('setMessage', 'Horimetro excluído com sucesso');
      })
      .catch(err => {
        commit('setLoading', false);
        commit('setError', true);
        commit('setMessage', err.response.data.message || err);
      })
  },

  async GET_ITEM_DATA({ commit }, payload) {
    commit('setLoading', true);
    commit('setError', false);
    commit('setMessage', '');
    const { idHydrometers, idTimesCourses } = payload;
    await get(`/level/hydrometer/${idHydrometers}/timeCourses/${idTimesCourses}/find`, 'COM_TOKEN_USUARIO')
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
  }

}
