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
      name: '',
      document: '',
      address: '',
      num: '',
      district: '',
      city: '',
      state: '',
      phone: ''
    },
    rulesRequired: [
      (v) => !!v || 'Este campo é obrigatório',
    ],
    rulesRequiredMin6: [
      (v) => !!v || 'Este campo é obrigatório',
      (v) => v.length > 5 || 'Este campo deve conter no minimo 6 caracteres'
    ],
    items: [
      { text: 'Home', to: "home", nuxt: true },
      { text: 'Clientes', to: "clients", disabled: true },
    ],
    loading: false,
    itemsGrid: [],
    headerGrid: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Empresa', value: 'name', class: 'blue-grey lighten-4' },
      { text: 'Cidade', value: 'city', class: 'blue-grey lighten-4' },
      { text: 'Estado', value: 'state', class: 'blue-grey lighten-4' },
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
        tooltip: 'Cadastro de Fazendas',
        color: "blue-grey darken-80"
      }

    ]
  }),

  computed: {
    ...mapGetters({
      dataStore: 'Client/getData',
      itemStore: 'Client/getItem',
      vuexMessage: 'Client/getMessage',
      vuexError: 'Client/getError'
    })
  },

  watch: {
    itemStore(value) {
      if (value !== {}) {

        this.formData.id = value.id;
        this.formData.name = value.name;
        this.formData.document = value.document;
        this.formData.address = value.address;
        this.formData.num = value.num;
        this.formData.district = value.district;
        this.formData.state = value.state;
        this.formData.city = value.city;
        this.formData.phone = value.phone
        this.formModal = true
        this.loading = false;
      }
    },

    dataStore(value) {
      if (value !== []) {
        this.datagrid = value;
      }
    },

    vuexMessage(value) {
      if (value !== '') {
        if (this.vuexError === true) {
          this.$swal.fire({
            type: 'error',
            title: 'Notificação do sistema - Error',
            text: value
          })
        } else {
          this.$swal.fire({
            type: 'success',
            title: 'Notificação do sistema - Sucesso',
            text: value
          })

          this.formModal = false;
          this.loading = false;
          this.loadData();
        }
      }
    },
  },

  async mounted() {
    await this.loadData();
  },

  methods: {

    clearForm() {
      this.formData.id = null;
      this.formData.name = '';
      this.formData.document = '';
      this.formData.address = '';
      this.formData.num = '';
      this.formData.district = '';
      this.formData.state = '';
      this.formData.city = '';
      this.formData.phone = ''
    },

    loadData() {
      this.loading = true;
      this.$store.dispatch('Client/GET_LIST');
      this.loading = false;
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
        this.$store.dispatch('Client/GET_ITEM', params.id);
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
      this.$store.dispatch('Client/GET_ITEM', params.id);
    },

    async saveData() {
      this.loading = true;
      this.$store.dispatch('Client/SET_DATA', {
        typeOperation: this.formAction,
        data: this.formData
      });

      this.formModal = false;


    },

    toFarm(params) {
      this.$router.push({
        name: 'farms',
        params
      })
    }
  }
}
