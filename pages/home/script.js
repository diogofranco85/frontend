import { mapGetters } from 'vuex';

export default {
  data: () => ({
    selectClient: [],
    selectFarm: [],
    modelMessage: false,
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
    },

    modelMessage(value) {
      console.log('model', value);
    }
  },

  methods: {
    loadData() {
      this.$store.dispatch('Client/GET_LIST');
    },

    abrirModal() {
      this.modelMessage = true;
    },

    closeModal() {
      this.modelMessage = false;
    }
  }
}
