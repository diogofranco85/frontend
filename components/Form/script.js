export default {
  props: {
    open: { type: Boolean, default: false},
    title: {type: String, default: ''},
    actClose: Function,
    actSave: Function,
    editable: { type: Boolean, default: true }
  },

  data: () => ({

  })
}
