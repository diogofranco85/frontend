import { mapGetters } from "vuex";

export default {
  data: () => ({
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
      { text: 'Home', href: "home" },
      { text: 'Clientes', href: "clients", disabled: true },
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
    })
  },

  watch: {
    itemStore(value, oldValue) {
      if (value !== oldValue) {
        this.formModal = true
        this.formData.id = value.id;
        this.formData.name = value.name;
        this.formData.document = value.document;
        this.formData.address = value.address;
        this.formData.num = value.num;
        this.formData.district = value.district;
        this.formData.state = value.state;
        this.formData.city = value.city;
        this.formData.phone = value.phone
        this.loading = false;
      }
    }
  },

  mounted() {
    this.loadData();
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
      this.formAction = 'edit'
      this.formActionInsertOrEdit = true;
      this.loading = true;
      this.$store.dispatch('Client/GET_ITEM', params.id);
    },

    viewData(params) {
      this.formActionInsertOrEdit = false;
      this.loading = true;
      this.$store.dispatch('Client/GET_ITEM', params.id);
    },

    saveData() {
      this.loading = true;
      this.$store.dispatch('Client/SET_DATA', {
        typeOperation: this.formAction,
        data: this.formData
      });
    },

    toFarm(params) {

    }
  }
}
