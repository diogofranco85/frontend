import { mapGetters } from 'vuex';
export default {
  data: () => ({
    formModal: false,
    formActionInsertOrEdit: false,
    formRef: null,
    formEditKey: true,

    formAction: 'new',

    formData: {
      id: null,
      name: null,
      value: null,
      createdAt: null,
      updatedAt: null
    },

    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Configurações', to: "/configurations", disabled: true },
    ],
    headers: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Chave', value: 'name', class: 'blue-grey lighten-4' },
      { text: 'Valor', value: 'value', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    actions: [

      {
        id: 1,
        icon: 'mdi-pencil',
        evento: 1,
        tooltip: 'Editar Registro',
        color: "blue darken-40"
      },
      {
        id: 2,
        icon: 'mdi-magnify',
        evento: 2,
        tooltip: 'Visualizar Registro',
        color: "blue-grey darken-80"
      },
      {
        id: 3,
        icon: 'mdi-arrow-right',
        evento: 3,
        tooltip: 'Items',
        color: "blue-grey darken-80"
      }
    ]
  }),

  computed: {
    ...mapGetters({
      list: 'Descriptive/getData',
      item: 'Descriptive/getItem',
      loading: 'Descriptive/getLoading',
      message: 'Descriptive/getMessage',
      error: 'Descriptive/getError'
    }),
  },

  watch: {
    item(value, oldValue) {
      if (value != oldValue && value != {}) {
        this.formData.id = value.id;
        this.formData.name = value.name;
        this.formData.value = value.value;
        this.formData.createdAt = value.createdAt;
        this.formData.updatedAt = value.updatedAt;
      }
    },

    message(value) {
      if (value && value != '') {
        if (this.error == true) {
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
          this.reload();
        }
      }
    }
  },

  mounted() {
    this.reload();
  },

  methods: {
    add() {
      this.formActionInsertOrEdit = true;
      this.clear();
      this.formModal = true;
      this.formEditKey = true;
      this.formAction = 'new';
    },

    edit({ id }) {
      this.$store.dispatch('Descriptive/GET_ITEM', id);
      this.formActionInsertOrEdit = true;
      this.formAction = 'edit';
      this.formEditKey = false;
      this.formModal = true;
    },

    view({ id }) {
      this.edit({ id });
      this.formActionInsertOrEdit = false;
    },

    save() {
      this.$refs.formRef.validate()
        .then(success => {
          if (success) {
            this.$store.dispatch('Descriptive/SET_DATA', {
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

    clear() {
      this.formData.id = null;
      this.formData.name = null;
      this.formData.value = null;
      this.formData.createdAt = null;
      this.formData.updatedAt = null;

      if (this.$refs.formRef)
        this.$refs.formRef.reset();
    },

    reload() {
      this.$store.dispatch('Descriptive/GET_DATA');
    },

    toItemList({ name, id }) {
      this.$router.push(`/configurations/${name}/items/${id}`)
    },

    formClose() {
      this.formModal = false;
    }
  }
}
