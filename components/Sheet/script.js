export default {
  data: () => ({
    icon: 'mdi-hand-up',
  }),

  props: {
    items: Array,
    deleteAct: Function,
    updateAct: Function,
    limitHidrometer: {
      type: Number,
      default: 0
    },
    limitHour: {
      type: Number,
      default: 0
    }
  },

  watch: {
    items(value) {
      console.log('value item', value);
    }
  },

  methods: {
    calcLimitHourColor(lancLimitHour) {
      if (this.limitHour <= lancLimitHour) {
        this.icon = 'mdi-thumb-down-outline';
        return 'red'
      } else {
        this.icon = 'mdi-thumb-up-outline';
        return 'green'
      }
    },

    calcLimitHorimetroColor(lancLimitHorimetro) {
      if (this.limitHidrometer <= lancLimitHorimetro) {
        this.icon = 'mdi-thumb-down-outline';
        return 'red'
      } else {
        this.icon = 'mdi-thumb-up-outline';
        return 'green'
      }
    }
  }

}
