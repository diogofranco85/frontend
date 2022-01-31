
export default {
  setAuth(state, payload) {
    window.localStorage.setItem('user_auth', payload);
    state.auth = payload;
  },

  setUser(state, payload) {
    window.localStorage.setItem('user_profile', JSON.stringify(payload));
    state.user = payload;
  },

  setMenu(state, payload) {

    let menu = [];

    payload.map(item => {
      menu.push({
        id: item.id,
        title: item.name,
        icon: item.icon,
        to: item.path,
      })
    })

    state.menu = menu;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setError(state, payload) {
    state.error = payload;
  },

  setMessage(state, payload) {
    state.message = payload;
  },

  setToken(state, payload) {
    window.localStorage.setItem('access_token', payload);
    state.token = payload;
  }
}
