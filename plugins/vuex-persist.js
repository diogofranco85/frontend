import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'hype_state',
    storage: window.localStorage,
    reducer: (state) => ({
      Auth: state.Auth,
      User: state.User,
    })
  }).plugin(store);
}
