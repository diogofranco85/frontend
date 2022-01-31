import { mapGetters } from 'vuex';

export default {
  data: () => ({
    loading: true,
  }),
  middleware: ['auth'],
  computed: {
    ...mapGetters({
      items: "Auth/getMenu",
    }),
  },

  // computed: {
  //   ...mapGetters({

  //     average: 'Chart/getAverage',
  //     hoursDay: 'Chart/getHoursDay',
  //     cubicMeterDay: 'Chart/getCubicMeterDay',
  //   })
  // },

  mounted() {

  },

  methods: {
    actCliente() {
      this.$router.push('/clients');
    },

    actTimeCourse() {
      this.$router.push('/time_courses/index');
    },

    actStatic() {
      this.$router.push('/sheets/flow');

    },

    actRuler() {
      this.$router.push('/sheets/rulers');

    },

    actReport() {
      this.$router.push('/reports');
    },

    actUser() {
      this.$router.push('/users/index');

    }


  }
}
