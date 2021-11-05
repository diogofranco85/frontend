
export default {
  setAuth(state, payload){
    window.localStorage.setItem('user_auth', payload);
    state.auth = payload;
  },

  setUser(state, payload){
    window.localStorage.setItem('user_profile', JSON.stringify(payload));
    state.user = payload;
  },

  setLoading(state, payload){
    state.loading = payload;
  },

  setError(state, payload){
    state.error = payload;
  },

  setMessage(state, payload){
    state.message = payload;
  },

  setToken(state, payload){
    window.localStorage.setItem('access_token', payload);
    state.token = payload;
  }
}
