import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'hype_state',
    storage: window.localStorage
  }).plugin(store);
}
