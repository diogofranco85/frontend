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
    clientData: {
      name: '',
      id: '',
      document: '',
      phone1: '',
      city: '',
    },
    formData: {
      id: null,
      idClient: '',
      name: '',
      longitude: '',
      latitude: '',
      email: '',
      phone: '',
      limitHorimeterDay: '',
      limitHourDay: '',
      idTypeMeter: '',
    },

    selectTypeMeter: [],

    rulesRequired: [
      (v) => !!v || 'Este campo é obrigatório',
    ],
    rulesRequiredMin6: [
      (v) => !!v || 'Este campo é obrigatório',
      (v) => v.length > 5 || 'Este campo deve conter no minimo 6 caracteres'
    ],
    items: [
      { text: 'Home', to: "home", nuxt: true },
      { text: 'Clientes', to: "clients", nuxt: true },
      { text: 'Fazendas', to: "farms", disabled: true },
    ],
    itemsGrid: [],
    headerGrid: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Fazenda', value: 'name', class: 'blue-grey lighten-4' },
      { text: 'latitude', value: 'latitude', class: 'blue-grey lighten-4' },
      { text: 'longitude', value: 'longitude', class: 'blue-grey lighten-4' },
      { text: 'Contato', value: 'phone', class: 'blue-grey lighten-4' },
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
      },
      {
        id: 3,
        icon: 'mdi-arrow-right',
        evento: 2,
        tooltip: 'Cadastro de outorgas',
        color: "blue-grey darken-80"
      }

    ]
  }),

  computed: {
    ...mapGetters({
      itemClient: 'Farm/getClient',
      dataStore: 'Farm/getData',
      itemStore: 'Farm/getItem',
      message: 'Farm/getMessage',
      error: 'Farm/getError',
      loading: 'Farm/getLoading',

      descriptiveItems: 'DescriptiveItems/getData',
    })
  },

  watch: {
    itemClient(value) {
      if (value !== {}) {
        this.clientData = { ...value };
        this.loadDataGrid();
      }
    },

    itemStore(value) {
      if (value !== {}) {
        this.formData.id = value.id;
        this.formData.idClient = value.idClient;
        this.formData.name = value.name;
        this.formData.longitude = value.longitude;
        this.formData.latitude = value.latitude;
        this.formData.email = value.email;
        this.formData.phone = value.phone;
        this.formData.limitHourDay = value.limitHourDay;
        this.formData.limitHorimeterDay = value.limitHorimeterDay;
        this.formData.idTypeMeter = value.idTypeMeter;
        this.formModal = true
        this.loading = false;
      }
    },

    dataStore(value) {
      if (value !== []) {
        this.datagrid = value;
      }
    },

    descriptiveItems(value, oldValue) {
      if (oldValue != []) {
        value.map(item => {
          this.selectTypeMeter.push({
            text: `${item.value}`,
            value: item.id
          })
        })
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
        }

        this.loadData();
      }

      this.$store.dispatch('Farm/LIMPAR_MENSAGEM');
      this.loadDataGrid();
    },
  },

  async mounted() {
    this.loadData();

    var farm = this.$store.state.Farm;
    if (!farm.client.id) {
      this.$router.push('/clients');
    }
  },

  methods: {

    clearForm() {
      this.formData.id = null;
      this.formData.idClient = null;
      this.formData.name = null;
      this.formData.longitude = null;
      this.formData.latitude = null;
      this.formData.email = null;
      this.formData.phone = null;
      this.formData.limitHourDay = null;
      this.formData.limitHorimeterDay = null;
      this.formData.idTypeMeter = null;
    },

    loadData() {
      const { id } = this.$route.params;
      this.$store.dispatch('Farm/GET_CLIENT', id);
    },

    loadDataGrid() {
      const { id } = this.$route.params;
      this.$store.dispatch('Farm/GET_LIST', { id });
    },

    newData() {
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
      this.formActionInsertOrEdit = true;
      this.clearForm();
      this.formModal = true;
    },

    editData(params) {
      try {
        this.formAction = 'edit'
        this.formActionInsertOrEdit = true;
        this.loading = true;
        this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
        this.$store.dispatch('Farm/GET_ITEM', params.id);
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
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
      this.$store.dispatch('Farm/GET_ITEM', params.id);
    },

    async saveData() {

      if (this.validate()) {
        return;
      }

      this.loading = true;
      this.formData.idClient = this.clientData.id;
      this.$store.dispatch('Farm/SET_DATA', {
        typeOperation: this.formAction,
        data: this.formData
      })

      this.formModal = false;
      this.loading = false;
    },

    validate() {
      let message = '';
      let error = false;

      if (!this.formData.name) {
        message = 'O nome da fazenda não pode ficar em branco';
        error = true;
      }

      if (!this.formData.longitude) {
        message = 'O campo longitude não pode ficar em branco';
        error = true;
      }

      if (!this.formData.latitude === '') {
        message = 'O campo latitude não pode ficar em branco';
        error = true;
      }

      if (error === true) {
        this.$swal.fire({ type: 'error', title: 'Validação de campos', text: message });
        return true
      }

      return false;
    },

    toPage(params) {
      this.$router.push(`/farms/${params.id}/manager`)
    },
  }
}
