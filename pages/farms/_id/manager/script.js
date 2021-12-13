import { mapGetters } from 'vuex';
export default {
  middleware: ['auth'],
  data: () => ({
    mapType: 'terrain',
    optionsMaps: {
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUI: false
    },
    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Clientes', to: "/clients", nuxt: true },
      { text: 'Fazendas', to: 'farm', nuxt: true, disabled: true },
      { text: 'Gerenciar', to: "/farms-manager", disabled: true },
    ],
    clientData: {
      id: '',
      name: '',
      document: ''
    },

    farmData: {
      id: '',
      farm: '',
      longitude: '',
      latitude: '',
    },

    hydrometerForm: {
      identifier: '',
      idFarm: ''
    },

    hydrometerModal: false,

    latitude: 0,
    longitude: 0,
    hydrometerHeader: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Identificador', value: 'identifier', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    hydrometerActions: [
      {
        id: 1,
        icon: 'mdi-close',
        evento: 1,
        tooltip: 'excluir Registro',
        color: "red darken-80"
      },
    ],

    levelHeader: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Periodo', value: 'timeCourse.description', class: 'blue-grey lighten-4' },
      { text: 'Hidrometro', value: 'hydrometer.identifier', class: 'blue-grey lighten-4' },
      { text: 'Nivél estático', value: 'valueHydrometer', class: 'blue-grey lighten-4' },
      { text: 'Nivél Dinâmico', value: 'valueHourley', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ],
    levelActions: [
      {
        id: 1,
        icon: 'mdi-close',
        evento: 1,
        tooltip: 'excluir Registro',
        color: "red darken-80"
      },
    ],

    levelModal: false,
    levelForm: {
      idTimesCourses: '',
      idHydrometers: '',
      valueHydrometer: '',
      valueHourley: '',
    },

    selectTimecourses: [],
    selectHydrometer: [],

    dialogStatus: false,
    dialogMessage: '',
    dialogType: 'success',
  }),

  computed: {
    ...mapGetters({
      getFarm: 'Gerenciar/getFarm',
      message: 'Gerenciar/getMessage',
      error: 'Gerenciar/getError',
      loading: 'Gerenciar/getLoading',

      hydrometerData: 'Hydrometer/getData',
      hydrometerLoading: 'Hydrometer/getLoading',
      hydrometerMessage: 'Hydrometer/getMessage',
      hydrometerError: 'Hydrometer/getError',

      levelData: 'Level/getData',
      levelLoading: 'Level/getLoading',
      levelMessage: 'Level/getMessage',
      levelError: 'Level/getError',

      timeCourses: 'TimeCourses/getData',
    })
  },

  watch: {

    getFarm(value) {
      this.farmData = value;
      this.latitude = parseFloat(value.latitude);
      this.longitude = parseFloat(value.longitude);
      this.getHydrometer();
      this.getLevel();
      this.getTimeCourses();

      this.hydrometerForm.idFarm = value.id;

      const pathFarm = `/farms/client/${value.id}/list`;

      this.items[2].to = pathFarm;
    },

    message(value) {
      if (value !== '') {
        if (this.error === true) {
          this.$swal.fire({
            type: 'error',
            title: 'Notificação',
            text: value
          })
        }
      }
    },

    hydrometerMessage(value) {
      if (value != '') {
        if (this.hydrometerError == true) {
          this.$swal.fire({
            title: 'Error ao executar ação',
            text: value,
            type: 'error'
          })
        } else {
          this.$swal.fire({
            title: 'Operação realizada com sucesso',
            text: value,
            type: 'success'
          })

          this.hydrometerModal = false;
          this.getHydrometer();
        }
      }
    },

    hydrometerData(value, oldValue) {
      if (value !== oldValue) {
        value.map(item => {
          this.selectHydrometer.push({
            value: item.id,
            text: item.identifier
          })
        })
      }
    },

    timeCourses(value, oldValue) {
      if (value !== oldValue) {
        console.log(value);
        value.map(item => {
          this.selectTimecourses.push({
            value: item.id,
            text: item.description
          })
        })
      }
    },

    levelMessage(value, oldValue) {
      if (value !== '') {
        if (this.levelError == false) {
          this.dialogOpen(value, 'success');
          this.getLevel();
          this.levelModal = false;
        } else {
          this.dialogOpen(value, 'error');
        }
      }
    }
  },

  mounted() {
    this.loadData();
    this.mapType = 'hybrid'
  },

  methods: {
    async loadData() {
      const params = this.$route.params;

      if (!params.id) {
        this.$router.push('/clients');
      }

      this.$store.dispatch('Gerenciar/GET_FARM', params.id);

    },

    getHydrometer() {
      this.$store.dispatch('Hydrometer/GET_LIST', this.getFarm.id);
    },

    getLevel() {
      this.$store.dispatch('Level/GET_LIST', this.getFarm.id);
    },

    getTimeCourses() {
      this.$store.dispatch('TimeCourses/GET_LIST');
    },

    hydrometerNew() {
      this.hydrometerForm.identifier = '';
      this.hydrometerModal = true;
    },

    hydrometerDel(params) {
      this.$store.dispatch('Hydrometer/SET_DEL', params.id);

    },

    hydrometerSave() {
      this.$store.dispatch('Hydrometer/SET_DATA', this.hydrometerForm);
    },

    levelNew() {
      this.levelForm.idTimesCourses = '';
      this.levelForm.idHydrometers = '';
      this.levelForm.valueHydrometer = '';
      this.levelForm.valueHourley = '';
      this.levelForm.id = '';
      this.levelModal = true;
    },

    levelDel(params) {
      this.$store.dispatch('Level/SET_DEL', params.id);

    },

    levelSave() {
      this.$store.dispatch('Level/SET_DATA', this.levelForm);
    },

    dialogClose() {
      this.dialogStatus = false;
    },

    dialogOpen(message, type) {
      this.dialogMessage = message;
      this.dialogType = type;
      this.dialogStatus = true;
    }
  }

}
