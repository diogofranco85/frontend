export default {
  props: {
    title: String,
    linkText: String,
    linkAct: Function,
    urlImage: {
      type: String,
      default: 'https://raw.githubusercontent.com/ijklim/simon-game/gh-pages/assets/img/bg--game-pad.jpg'
    },
    color: {
      type: String,
      default: 'cyan darken-2'
    }
  }
}
