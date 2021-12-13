import { mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: true,
  }),
  middleware: ['auth'],

  computed: {
    ...mapGetters({
      average: 'Chart/getAverage',
      hoursDay: 'Chart/getHoursDay',
      cubicMeterDay: 'Chart/getCubicMeterDay',
    })
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      this.$store.dispatch('Chart/GET_SHEETS');
    },
  }
}
