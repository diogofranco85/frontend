import { mapGetters } from 'vuex';

export default {
  components: {
    HForm: () => {
      return import('../Form');
    }
  },
  props: {
    control: Boolean,
    close: Function,
    idFarm: String,
    identifier: {
      default: null,
      type: Number
    }
  },
  data: () => ({
    openModal: false,
    formActionInsertOrEdit: false,
    formRef: null,
    formData: {
      identifier: null,
      tag: null,
      idMeter: null,
      active: true,
      initialHourValue: 0,
      initialHydroValue: 0
    },
    header: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Identificador', value: 'identifier', class: 'blue-grey lighten-4' },
      { text: 'TAG', value: 'tag', class: 'blue-grey lighten-4' },
      { text: 'Horimetro Inicial', value: 'initialHourValue', class: 'blue-grey lighten-4' },
      { text: 'Hidrometro Inicial', value: 'initialHydroValue', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    gridActions: [
      {
        id: 1,
        icon: 'mdi-delete',
        evento: 1,
        tooltip: 'Excluir registro',
        color: "red darken-80"
      }
    ],
    blError: false,
  }),

  computed: {
    ...mapGetters({
      hydrometer: 'Hydrometer/getData',
      loading: 'Hydrometer/getLoading',
      message: 'Hydrometer/getMessage',
      error: 'Hydrometer/getError',
    }),
    model: {
      get() {
        return this.control;
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  watch: {
    message(value, oldValue) {
      if (value !== oldValue && value != '')
        if (this.error == true) {
          this.$swal.fire({
            type: 'error',
            title: 'Error ao processar requisição',
            text: value
          })
        } else {
          this.$swal.fire({
            type: 'success',
            title: 'Dados salvos',
            text: 'Dados salvos com sucesso'
          })
          this.clearForm();
          this.$refs.formRef.reset();
          this.loadData();
        }
      this.$store.dispatch('Hydrometer/LIMPAR_MENSAGEM');
    }
  },

  identifier(value, oldValue) {
    if (value != oldValue) {
      this.loadData();
    }
  },

  methods: {
    loadData() {
      if (this.identifier == null || this.identifier == '') {
        return;
      }

      this.$store.dispatch('Hydrometer/GET_LIST', this.identifier);
    },

    openForm() {
      this.formActionInsertOrEdit = true;
      this.formModal = true;
    },

    clearForm() {
      this.formData.identifier = null;
      this.formData.tag = null;
      this.formData.initialHourValue = 0;
      this.formData.initialHydroValue = 0;
    },

    saveData() {
      this.$refs.formRef.validate()
        .then(success => {
          if (success) {
            this.formData.idMeter = this.identifier;
            this.$store.dispatch('Hydrometer/SET_DATA', { data: this.formData });
          } else {
            this.$swal.fire({
              type: 'error',
              title: 'Validação de formulário',
              text: 'É necessário preencher todos os campos destacados em vermelho'
            })
          }

        })
    },

    deleteData({ id }) {

      this.$swal.fire({
        title: 'Excluir dados',
        text: 'Deseja realmente excluir esse dados. Essa operação e inrreversível',
        confirmButtonText: 'Sim',
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
      }).then(result => {
        if (result.value == true) {
          this.$store.dispatch('Hydrometer/SET_DEL', id);
        }
      });
    }
  }
}
