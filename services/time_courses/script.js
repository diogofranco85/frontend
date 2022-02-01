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
      description: '',
      startDate: '',
      endDate: '',
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
      { text: 'Descrição', value: 'description', class: 'blue-grey lighten-4' },
      { text: 'Início', value: 'startDateBR', class: 'blue-grey lighten-4' },
      { text: 'Termino', value: 'endDateBR', class: 'blue-grey lighten-4' },
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
    ]
  }),

  computed: {
    ...mapGetters({
      dataStore: 'TimeCourses/getData',
      itemStore: 'TimeCourses/getItem',
      message: 'TimeCourses/getMessage',
      error: 'TimeCourses/getError',
      loading: 'TimeCourses/getLoading'
    })
  },

  watch: {
    itemStore(value) {
      if (value !== {}) {
        this.formData.id = value.id;
        this.formData.description = value.description;
        this.formData.startDate = value.startDate;
        this.formData.endDate = value.endDate;
        this.formModal = true
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
      this.formData.description = '';
      this.formData.startDate = '';
      this.formData.endDate = '';
    },

    loadData() {
      this.$store.dispatch('TimeCourses/GET_LIST');
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
        this.$store.dispatch('TimeCourses/GET_ITEM', params.id);
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
      this.$store.dispatch('TimeCourses/GET_ITEM', params.id);
    },

    async saveData() {
      this.$store.dispatch('TimeCourses/SET_DATA', {
        typeOperation: this.formAction,
        data: this.formData
      });
    },

    toFarm(params) {
      this.$router.push(`/farms/client/${params.id}/list`);
    }
  }
}
