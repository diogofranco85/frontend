import { mapGetters } from 'vuex';
export default {
  data: () => ({
    loading: false,
    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Clientes', to: "/clients", nuxt: true },
      { text: 'Fazendas', to: "/farms", disabled: true },
      { text: 'Gerenciar', to: "/farms-manager", disabled: true },
    ],
    clientData: {
      id: '',
      name: '',
      document: ''
    },

    farmData: {
      id: '',
      farm: '',
      longitude: '',
      latitude: '',
    },

    latitude: 25,
    longitude: 30,
  }),

  computed: {
    ...mapGetters({
      getClient: 'Gerenciar/getClient',
      getFarm: 'Gerenciar/getFarm',
      message: 'Gerenciar/getMessage',
      error: 'Gerenciar/getError'
    })
  },

  watch: {
    getClient(value, oldValue) {
      if (value !== oldValue) {
        this.clientData = value;
      }
    },

    getFarm(value) {
      this.farmData = value;
      this.latitude = parseFloat(value.latitude);
      this.longitude = parseFloat(value.longitude);
    },

    message(value) {
      if (value !== '') {
        if (this.error === true) {
          this.$swal.fire({
            type: 'error',
            title: 'Notificação',
            text: value
          })
        }
      }
    }
  },

  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const params = this.$route.params;

      if (!params.id) {
        this.$router.push('/clients');
      }

      this.$store.dispatch('Gerenciar/GET_CLIENT', params.id_client);
      this.$store.dispatch('Gerenciar/GET_FARM', params.id);

    }
  }

}
