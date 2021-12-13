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
    selectState: [],
    formData: {
      id: null,
      name: '',
      document: '',
      street: '',
      number: '',
      district: '',
      city: '',
      idState: '',
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
    itemsGrid: [],
    headerGrid: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Empresa', value: 'name', class: 'blue-grey lighten-4' },
      { text: 'Cidade', value: 'city', class: 'blue-grey lighten-4' },
      { text: 'Estado', value: 'State.value', class: 'blue-grey lighten-4' },
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
      message: 'Client/getMessage',
      error: 'Client/getError',
      descriptiveItems: 'DescriptiveItems/getData',
      loading: 'Client/getLoading'
    })
  },

  watch: {
    itemStore(value) {
      if (value !== {}) {
        this.formData.id = value.id;
        this.formData.name = value.name;
        this.formData.document = value.document;
        this.formData.street = value.street;
        this.formData.number = value.number;
        this.formData.district = value.district;
        this.formData.idState = value.idState;
        this.formData.city = value.city;
        this.formData.phone = value.phone
        this.formModal = true
      }
    },

    descriptiveItems(value, oldValue) {
      if (oldValue != []) {
        value.map(item => {
          this.selectState.push({
            text: `${item.name} - ${item.value}`,
            value: item.id
          })
        })
      }
    },

    dataStore(value) {
      if (value !== []) {
        this.datagrid = value;
      }
    },

<<<<<<< HEAD
    vuexMessage(value) {
      if (value !== '') {
        if (this.vuexError === true) {
=======
    message(value, oldValue) {
      console.log('value', { atual: value, antigo: oldValue, error: this.error });
      if (value !== "") {
        if (this.error === true) {
>>>>>>> origin/master
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
<<<<<<< HEAD

          this.formModal = false;
          this.loading = false;
=======
          this.formModal = false;
>>>>>>> origin/master
          this.loadData();
        }
      }
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {

    clearForm() {
      this.formData.id = null;
      this.formData.name = '';
      this.formData.document = '';
      this.formData.street = '';
      this.formData.number = '';
      this.formData.district = '';
      this.formData.state = '';
      this.formData.city = '';
      this.formData.phone = ''
    },

    loadData() {
      this.$store.dispatch('Client/GET_LIST');
    },

    newData() {
      this.formActionInsertOrEdit = true;
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-state' });
      this.clearForm();
      this.formModal = true;
    },

    editData(params) {
      try {
        this.formAction = 'edit'
        this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-state' });
        this.formActionInsertOrEdit = true;
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
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-state' });
      this.formActionInsertOrEdit = false;
      this.$store.dispatch('Client/GET_ITEM', params.id);
    },

    async saveData() {
      this.$store.dispatch('Client/SET_DATA', {
        typeOperation: this.formAction,
        data: this.formData
      });
<<<<<<< HEAD

      this.formModal = false;


=======
>>>>>>> origin/master
    },

    toFarm(params) {
      const { id } = params;
      const url = `/farms/client/${id}/list`;
      this.$router.push({
<<<<<<< HEAD
        name: 'farms',
        params
      })
=======
        path: url,
        params: {
          id
        }
      });
>>>>>>> origin/master
    }
  }
}
