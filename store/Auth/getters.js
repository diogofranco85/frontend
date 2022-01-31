export default {
  getAuth(state) {
    return state.auth;
  },

  getUser(state) {
    return state.user;
  },

  getMenu(state) {
    return state.menu;
  },

  getLoading(state) {
    return state.loading;
  },

  getError(state) {
    return state.error;
  },

  getMessage(state) {
    return state.message;
  },

  getToken(state) {
    return state.token;
  }
}
