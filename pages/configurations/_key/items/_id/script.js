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
      idDescriptive: null,
      name: null,
      value: null,
      createdAt: null,
      updatedAt: null
    },

    titleBar: "",

    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Configurações', to: "/configurations", nuxt: true },
      { text: 'Items', to: "/items", disabled: true },
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
    ]
  }),

  computed: {
    ...mapGetters({
      list: 'DescriptiveItems/getData',
      loading: 'DescriptiveItems/getLoading',
      item: 'DescriptiveItems/getItem',
      message: 'DescriptiveItems/getMessage',
      error: 'DescriptiveItems/getError',

      itemDescriptive: 'Descriptive/getItem',

    }),
  },

  watch: {
    item(value, oldValue) {
      if (value != oldValue && value != {}) {
        this.formData.id = value.id;
        this.formData.idDescriptive = value.idDescriptive;
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
    const { key, id } = this.$route.params;
    this.formData.idDescriptive = id;
    this.titleBar = key;
  },

  methods: {
    add() {
      this.formActionInsertOrEdit = true;
      this.clear();
      this.formModal = true;
      this.formEditKey = true;
      this.formAction = 'new'
    },

    edit({ id }) {
      this.$store.dispatch('DescriptiveItems/GET_ITEM', id);
      this.formActionInsertOrEdit = true;
      this.formEditKey = false;
      this.formModal = true;
      this.formAction = 'edit';

    },

    view({ id }) {
      this.edit({ id });
      this.formActionInsertOrEdit = false;
    },

    save() {
      this.$refs.formRef.validate()
        .then(success => {
          if (success) {
            this.$store.dispatch('DescriptiveItems/SET_DATA', {
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
      const { key } = this.$route.params;
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: key });
    },

    toItemList() {
      alert('item')
    },

    formClose() {
      this.formModal = false;
    }
  }
}
