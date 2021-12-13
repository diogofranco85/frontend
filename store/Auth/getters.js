export default {
  getAuth(state){
    return state.auth;
  },

  getUser(state){
    return state.user;
  },

  getLoading(state){
    return state.loading;
  },

  getError(state){
    return state.error;
  },

  getMessage(state){
    return state.message;
  },

  getToken(state){
    return state.token;
  }
}
