import { mapGetters } from "vuex";

export default {
  middleware: ['auth'],
  data: () => ({
    datagrid: [],
    formRef: null,
    formValid: null,
    formActionInsertOrEdit: true,
    formAction: 'new',
    formModal: false,
    formData: {
      id: null,
      idFarm: '',
      concierge: '',
      validateDate: '',
      validateEUA: '',
      validateBR: '',
      latitude: '',
      longitude: ''
    },

    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Clientes', to: "/clients/", nuxt: true },
      { text: 'Fazendas', to: '/farms/#', nuxt: true },
      { text: 'Outorgas', to: '#', disabled: true },
    ],

    itemsGrid: [],
    headerGrid: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Portaria', value: 'concierge', class: 'blue-grey lighten-4' },
      { text: 'Latitude', value: 'latitude', class: 'blue-grey lighten-4' },
      { text: 'Longitude', value: 'longitude', class: 'blue-grey lighten-4' },
      { text: 'Validade', value: 'validateBR', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    gridActions: [
      {
        id: 1,
        icon: 'mdi-magnify',
        evento: 3,
        tooltip: 'Visualizar Registro',
        color: "blue-grey darken-80"
      },
      {
        id: 2,
        icon: 'mdi-pencil',
        evento: 1,
        tooltip: 'Editar Registro',
        color: "blue darken-40"
      }
    ]
  }),

  computed: {
    ...mapGetters({
      dataStore: 'Outorgas/getData',
      itemStore: 'Outorgas/getItem',
      message: 'Outorgas/getMessage',
      error: 'Outorgas/getError',
      loading: 'Outorgas/getLoading',
    })
  },

  watch: {
    itemStore(value) {
      if (value !== {}) {
        this.formData.id = value.id;
        this.formData.idFarm = value.idFarm;
        this.formData.concierge = value.concierge;
        this.formData.validateBR = value.validateBR;
        this.formData.validateDate = value.validateEUA;
        this.formData.latitude = value.latitude;
        this.formData.longitude = value.longitude;
        this.formModal = true
      }
    },

    dataStore(value) {
      if (value !== []) {
        console.log('grid', value);
        this.datagrid = value;
      }
    },

    message(value) {
      if (value !== '') {
        if (this.error === true) {
          this.$swal.fire({
            type: 'error',
            title: 'Notificação do sistema',
            text: value
          })
        } else {
          this.$swal.fire({
            type: 'success',
            title: 'Notificação do sistema',
            text: value
          });
          this.formModal = false;
        }

        this.loadData();
      }

      this.$store.dispatch('Farm/LIMPAR_MENSAGEM');
    },
  },

  async mounted() {
    this.formModal = false;
    this.loadData();
  },

  methods: {

    clearForm() {
      this.formData.id = null;
      this.formData.idFarm = null;
      this.formData.concierge = null;
      this.formData.validateDate = null;
      this.formData.longitude = null;
      this.formData.latitude = null;

      if (this.$refs.formRef)
        this.$refs.formRef.reset();
    },

    loadData() {
      const { id } = this.$route.params;
      if (!id) {
        this.$router.push('/clients');
      }
      let pathFarm = `/farms/client/${id}/list`;

      this.items[2].to = pathFarm;
      this.formData.idFarm = id;

      this.$store.dispatch('Outorgas/GET_LIST', id);
    },

    newData() {
      this.formActionInsertOrEdit = true;
      this.clearForm();
      this.formModal = true;
    },

    editData(params) {
      try {
        this.formAction = 'edit'
        this.formActionInsertOrEdit = true;
        this.loading = true;
        this.$store.dispatch('Outorgas/GET_ITEM', params.id);
      } catch (err) {
        this.$swal.fire({
          type: 'error',
          title: 'Erro ao processar requisição',
          text: err.message
        })
      }

    },

    viewData(params) {
      this.formActionInsertOrEdit = false;
      this.loading = true;
      this.$store.dispatch('Outorgas/GET_ITEM', params.id);
    },

    async saveData() {

      this.$refs.formRef.validate()
        .then(success => {
          if (success) {
            const { id } = this.$route.params;
            this.formData.idFarm = id;
            this.$store.dispatch('Outorgas/SET_DATA', {
              typeOperation: this.formAction,
              data: this.formData
            })
          } else {
            this.$swal.fire({
              type: 'error',
              title: 'Validação de formulário',
              text: 'É necessário preencher todos os campos destacados em vermelho'
            })
          }
        })

    }
  }
}
