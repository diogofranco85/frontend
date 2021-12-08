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
      password: '',
      passwordConfirmation: '',
      email: '',
      idProfile: '',
    },
    selectProfile: [],
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
      { text: 'Nome', value: 'name', class: 'blue-grey lighten-4' },
      { text: 'E-mail', value: 'email', class: 'blue-grey lighten-4' },
      { text: 'Perfil', value: 'profile.name', class: 'blue-grey lighten-4' },
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
    ],

    dialogStatus: false,
    dialogMessage: '',
    dialogType: 'success'
  }),

  computed: {
    ...mapGetters({
      dataStore: 'User/getData',
      itemStore: 'User/getItem',
      message: 'User/getMessage',
      error: 'User/getError',
      loading: 'User/getLoading',
      profileData: 'Profile/getData'
    })
  },

  watch: {
    profileData(value) {
      if (value != []) {
        value.map(item => {
          this.selectProfile.push({
            value: item.id,
            text: item.name
          })
        })
      }
    },
    itemStore(value) {
      if (value !== {}) {
        this.formData.id = value.id;
        this.formData.name = value.name;
        this.formData.email = value.email;
        this.formData.idProfile = value.idProfile;
        this.formModal = true
      }
    },

    dataStore(value) {
      if (value !== []) {
        this.datagrid = value;
      }
    },

    message(value, oldValue) {
      console.log('value', { atual: value, antigo: oldValue, error: this.error });
      if (value !== "") {
        if (this.error === true) {
          this.openDialog(value, 'error');
        } else {
          this.openDialog(value, 'success');
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
      this.formData.name = '';
      this.formData.email = '';
      this.formData.idProfile = '';
    },

    loadData() {
      this.$store.dispatch('User/GET_LIST');
      this.loadProfile();
    },

    loadProfile() {
      this.$store.dispatch('Profile/GET_LIST');
    },

    newData() {
      this.formActionInsertOrEdit = true;
      this.clearForm();
      this.loadProfile();
      this.formModal = true;
    },

    editData(params) {
      this.formAction = 'edit'
      this.formActionInsertOrEdit = true;
      this.loadProfile();
      this.$store.dispatch('User/GET_ITEM', params.id);
    },

    viewData(params) {
      this.formActionInsertOrEdit = false;
      this.$store.dispatch('User/GET_ITEM', params.id);
    },

    async saveData() {
      this.$store.dispatch('User/SET_DATA', {
        typeOperation: this.formAction,
        data: this.formData
      });
    },

    toFarm(params) {
      this.$router.push(`/farms/client/${params.id}/list`);
    },

    openDialog(message, type) {
      this.dialogMessage = message;
      this.dialogType = type;
      this.dialogStatus = true;
    },
    dialogClose() {
      this.dialogStatus = false;
    }
  }
}
