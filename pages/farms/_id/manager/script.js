import { mapGetters } from 'vuex';
export default {
  data: () => ({

    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Clientes', to: "/clients", nuxt: true },
      { text: 'Fazendas', to: 'farm', nuxt: true },
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

    hydrometerForm: {
      identifier: '',
      idFarm: ''
    },

    hydrometerModal: false,

    latitude: 0,
    longitude: 0,
    hydrometerHeader: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Identificador', value: 'identifier', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    hydrometerActions: [
      {
        id: 1,
        icon: 'mdi-close',
        evento: 1,
        tooltip: 'excluir Registro',
        color: "red darken-80"
      },
    ]
  }),

  computed: {
    ...mapGetters({
      getFarm: 'Gerenciar/getFarm',
      message: 'Gerenciar/getMessage',
      error: 'Gerenciar/getError',
      loading: 'Gerenciar/getLoading',

      hydrometerData: 'Hydrometer/getData',
      hydrometerLoading: 'Hydrometer/getLoading',
      hydrometerMessage: 'Hydrometer/getMessage',
      hydrometerError: 'Hydrometer/getError'
    })
  },

  watch: {

    getFarm(value) {
      this.farmData = value;
      this.latitude = parseFloat(value.latitude);
      this.longitude = parseFloat(value.longitude);
      this.getHydrometer();
      this.hydrometerForm.idFarm = value.id;

      const pathFarm = `/farms/client/${value.id}/list`;

      this.items[2].to = pathFarm;
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
    },

    hydrometerMessage(value) {
      if (value != '') {
        if (this.hydrometerError == true) {
          this.$swal.fire({
            title: 'Error ao executar ação',
            text: value,
            type: 'error'
          })
        } else {
          this.$swal.fire({
            title: 'Operação realizada com sucesso',
            text: value,
            type: 'success'
          })

          this.hydrometerModal = false;
          this.getHydrometer();
        }
      }
    }
  },

  created() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const params = this.$route.params;

      if (!params.id) {
        this.$router.push('/clients');
      }

      this.$store.dispatch('Gerenciar/GET_FARM', params.id);

    },

    getHydrometer() {
      this.$store.dispatch('Hydrometer/GET_LIST', this.getFarm.id);
    },

    hydrometerNew() {
      this.hydrometerForm.identifier = '';
      this.hydrometerModal = true;
    },

    hydrometerDel(params) {
      this.$store.dispatch('Hydrometer/SET_DEL', params.id);

    },

    hydrometerSave() {
      this.$store.dispatch('Hydrometer/SET_DATA', this.hydrometerForm);
    }
  }

}
