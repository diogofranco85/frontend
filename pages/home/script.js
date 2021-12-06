import { mapGetters } from 'vuex';

export default {
  data: () => ({
    selectClient: [],
    selectFarm: [],
  }),
  middleware: ['auth'],

  computed: {
    ...mapGetters({
      client: 'Client/getData'
    })
  },

  mounted() {
    this.loadData();
  },

  watch: {
    client(value) {
      if (value !== []) {

        if (value.lenght > 0) {
          return;
        }

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
  }
}
