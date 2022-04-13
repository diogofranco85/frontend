import { mapGetters } from "vuex";

export default {
  middleware: ['auth'],
  data: () => ({
    datagrid: [],
    formRef: null,
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
      phone1: '',
      phone2: '',
    },
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
        this.formData.phone1 = value.phone1
        this.formData.phone2 = value.phone2
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

    message(value, oldValue) {
      if (value !== "") {
        if (this.error === true) {
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
      this.formData.name = null;
      this.formData.document = null;
      this.formData.street = null;
      this.formData.number = null;
      this.formData.district = null;
      this.formData.state = null;
      this.formData.city = null;
      this.formData.phone1 = null
      this.formData.phone2 = null

      if (this.$refs.formRef)
        this.$refs.formRef.reset();

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
      this.$refs.formRef.validate()
        .then(success => {
          if (success) {
            this.$store.dispatch('Client/SET_DATA', {
              typeOperation: this.formAction,
              data: this.formData
            });
          } else {
            this.$swal.fire({
              type: 'error',
              title: 'Validação de formulário',
              text: 'É necessário preencher todos os campos destacados em vermelho'
            })
          }

        })
    },

    toFarm(params) {
      const { id } = params;
      const url = `/farms/client/${id}/list`;
      this.$router.push({
        path: url,
        params: {
          idFarm: id
        }
      });
    }
  }
}
