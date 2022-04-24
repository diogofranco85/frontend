import { mapGetters } from 'vuex';
export default {
  data: () => ({
    formModal: false,
    formActionInsertOrEdit: false,
    formRef: null,
    formAction: 'new',
    formData: {
      id: null,
      idFarm: null,
      level: null,
      area: null,
      idClient: null,
      createdAt: null,
      updatedAt: null
    },

    selectClient: [],
    selectFarm: [],

    btnDisabled: false,

    items: [
      { text: 'Home', to: "home", nuxt: true },
      { text: 'Seção Total (Ʃ áreas)', to: "/full-section", disabled: true },
    ],
    headers: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Nível de Água', value: 'level', class: 'blue-grey lighten-4' },
      { text: 'Seção Total (Ʃ áreas)', value: 'area', class: 'blue-grey lighten-4' },
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
      list: 'FullSection/getData',
      item: 'FullSection/getItem',
      loading: 'FullSection/getLoading',
      message: 'FullSection/getMessage',

      client: 'Client/getData',
      farm: 'Farm/getData',
    }),
  },

  watch: {
    item(value, oldValue) {
      if (value != oldValue && value != {}) {
        this.formData.id = value.id;
        this.formData.idFarm = value.idFarm;
        this.formData.level = value.level;
        this.formData.area = value.area;
        this.formData.createdAt = value.createdAt;
        this.formData.updatedAt = value.updatedAt;
      }
    },

    client(value) {
      if (value.length > 0) {
        value.map(item => {
          this.selectClient.push({
            value: item.id,
            text: item.name
          })
        })
      }
    },

    farm(value) {
      if (value.length > 0) {
        value.map(item => {
          this.selectFarm.push({
            value: item.id,
            text: item.name
          })
        })
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
    //this.reload();
    this.$store.dispatch('Client/GET_LIST');
    this.btnDisabled = true;
  },

  methods: {
    add() {
      this.formActionInsertOrEdit = true;
      this.formAction = 'new';
      this.clear();
      this.formModal = true;
      this.formEditKey = true;
    },

    edit({ id }) {
      this.$store.dispatch('FullSection/GET_ITEM', id);
      this.formActionInsertOrEdit = true;
      this.formAction = 'edit';
      this.formEditKey = false,
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
            this.$store.dispatch('FullSection/SET_DATA', {
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
      this.formData.level = null;
      this.formData.area = null;
      this.formData.createdAt = null;
      this.formData.updatedAt = null;

      if (this.$refs.formRef)
        this.$refs.formRef.reset();
    },

    reload() {
      console.log(this.formData.idFarm);
      this.$store.dispatch('FullSection/GET_LIST', this.formData.idFarm);
    },

    onChangeClient() {
      if (this.formData.idClient == null) {
        this.selectFarm = [];
        return;
      }

      this.formData.idFarm = null
      this.$store.dispatch('Farm/GET_LIST', { id: this.formData.idClient });
    },

    onChangeFarm() {
      this.btnDisabled = false;
      this.$store.dispatch('FullSection/CLEAR_DATA');
    },

    showList() {
      if (this.formData.idClient == null) {
        this.$swal.fire({
          type: 'error',
          title: 'Validação de formulário',
          text: 'É necessário selecionar um cliente'
        })
        return;
      }

      if (this.formData.idFarm == null) {
        this.$swal.fire({
          type: 'error',
          title: 'Validação de formulário',
          text: 'É necessário selecionar uma fazenda'
        })
        return;
      }

      this.reload();
    },

    formClose() {
      this.formModal = false;
    }
  }
}
