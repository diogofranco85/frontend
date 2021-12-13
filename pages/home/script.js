import { mapGetters } from 'vuex';

export default {
  data: () => ({
<<<<<<< HEAD
    selectClient: [],
    selectFarm: [],
=======
    loading: true,
>>>>>>> origin/master
  }),
  middleware: ['auth'],

  computed: {
    ...mapGetters({
<<<<<<< HEAD
      client: 'Client/getData'
=======
      average: 'Chart/getAverage',
      hoursDay: 'Chart/getHoursDay',
      cubicMeterDay: 'Chart/getCubicMeterDay',
>>>>>>> origin/master
    })
  },

  mounted() {
    this.loadData();
  },

<<<<<<< HEAD
  watch: {
    client(value) {
      if (value !== []) {
        value.map(item => {
          this.selectClient.push({ text: item.name, value: item.id })
        })
      }
    }
  },

  methods: {
    loadData() {
      this.$store.dispatch('Client/GET_LIST');
    }
=======
  methods: {
    loadData() {
      this.$store.dispatch('Chart/GET_SHEETS');
    },
>>>>>>> origin/master
  }
}
