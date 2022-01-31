import { mapGetters } from 'vuex';
import { swal, toast } from '~/utils/alert';
export default {
  data: () => ({
    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Planilha', to: "/sheets", disabled: true },
    ],
    formShow: false,
    formData: {
      idClient: '',
      idFarm: '',
      idTimesCourses: '',
      idHydrometer: '',
      idLevel: '',
      calculationDate: '',
      hydrometerValue: '',
      hourmeterValue: '',
      cubicMeterDay: '',
      hoursDay: '',
      averageCapital: '',
      levelStatic: '',
      levelDynamic: ''
    },

    limitHourDay: 0,
    limitHorimeterDay: 0,

    selectClient: [],
    selectFarm: [],
    selectHydrometer: [],
    selectTimeCourses: [],

    flowSheetData: [],

    error: false,
    message: '',

    gridActions: [
      {
        id: 1,
        icon: 'mdi-close',
        evento: 1,
        tooltip: 'excluir Registro',
        color: "red darken-80"
      },
    ],

    headerGrid: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Data', value: 'calculationDateBR', class: 'blue-grey lighten-4' },
      { text: 'Hidrometro', value: 'hydrometerValue', class: 'blue-grey lighten-4' },
      { text: 'Horimetro', value: 'hourmeterValue', class: 'blue-grey lighten-4' },
      { text: 'Nivél estático', value: 'level.valueHourley', class: 'blue-grey lighten-4' },
      { text: 'Nivél Dinamico', value: 'level.valueHourley', class: 'blue-grey lighten-4' },
      { text: 'M/3 dia', value: 'cubicMeterDay', class: 'blue-grey lighten-4' },
      { text: 'H/dia estático', value: 'hoursDay', class: 'blue-grey lighten-4' },
      { text: 'Média Dia', value: 'averageCapital', class: 'blue-grey lighten-4' },
      { text: 'Ações', value: "acoes", class: "blue-grey lighten-4", sortable: false }
    ]
  }),

  computed: {
    ...mapGetters({
      typeSheet: 'DescriptiveItems/getItem',

      client: 'Client/getData',
      farm: 'Farm/getData',
      hydrometer: 'Hydrometer/getData',
      timeCourses: 'TimeCourses/getData',

      level: 'Level/getItem',

      farmItem: 'Farm/getItem',

      clientError: 'Client/getError',
      farmError: 'Farm/getError',
      hydrometerError: 'Hydrometer/getError',
      timeCoursesError: 'TimeCourses/getError',
      levelError: 'Level/getError',

      clientMessage: 'Client/getMessage',
      farmMessage: 'Farm/getMessage',
      hydrometerMessage: 'Hydrometer/getMessage',
      TimeCoursesMessage: 'TimeCourses/getMessage',
      levelMessage: 'Level/getMessage',

      flowSheets: 'FlowSheet/getData',
      flowSheetsMessage: 'FlowSheet/getMessage',
      flowSheetsError: 'FlowSheet/getError',
      loading: 'FlowSheet/getLoading'
    })
  },

  watch: {
    flowSheets(value, oldValue) {

      if (value !== oldValue) {
        this.flowSheetData = value;
      }
    },

    client(value) {
      if (value !== []) {
        value.map(item => {
          this.selectClient.push({
            text: item.name,
            value: item.id
          })
        })
      }
    },

    farm(value) {
      if (value !== []) {
        value.map(item => {
          this.selectFarm.push({
            text: item.name,
            value: item.id
          })
        })
      }
    },

    hydrometer(value) {
      if (value !== []) {
        value.map(item => {

          this.selectHydrometer.push({
            text: item.identifier,
            value: item.id
          })
        })
      }
    },

    timeCourses(value) {
      if (value !== []) {
        value.map(item => {
          this.selectTimeCourses.push({
            text: item.description,
            value: item.id
          })
        })
      }
    },

    level(value) {
      if (value !== {}) {
        this.formData.levelStatic = value.valueHydrometer;
        this.formData.levelDynamic = value.valueHourley;
      }
    },

    farmItem(value) {
      if (value !== {}) {
        this.limitHorimeterDay = value.limitHorimeterDay;
        this.limitHourDay = value.limitHourDay
      }
    },

    clientMessage(value) {
      if (value !== '') {
        this.message = value;
        this.error = this.clientError;
      }
    },

    farmMessage(value) {
      if (value !== '') {
        this.message = value;
        this.error = this.farmError;
      }
    },

    hydrometerMessage(value) {
      if (value !== '') {
        this.message = value;
        this.error = this.hydrometerError;
      }
    },

    timeCoursesMessage(value) {
      if (value !== '') {
        this.message = value;
        this.error = this.timeCoursesError;
      }
    },

    levelMessage(value) {
      if (value !== '') {
        if (this.levelError === true) {
          swal(this, value, 'error');
          this.formShow = false;
        }
      }
    },

    flowSheetsMessage(value) {
      if (value !== '') {
        if (this.flowSheetsError === true) {
          swal(this, value, 'error');
        } else {
          swal(this, value);
          this.getDataFlow();
          this.formData.valueHydrometer = '';
          this.formData.valueHourley = '';
        }
      }
    },

    message(value) {
      if (value != '') {
        if (this.error == true) {
          swal(this, value, 'error');
        } else {
          swal(this, value);
        }
      }
    },
  },

  mounted() {
    this.loadClient();
    this.$store.dispatch('FlowSheet/CLEAR_DATA');
    this.$store.dispatch('DescriptiveItems/GET_BY_KEY', 'Static');

  },


  methods: {
    loadClient() {
      this.$store.dispatch('Client/GET_LIST');
    },

    onChangeClient() {
      this.formShow = false;
      this.formData.idFarm = null;
      this.formData.idHydrometer = null;
      this.formData.idTimesCourses = null;
      this.selectFarm = [];
      this.selectHydrometer = [];
      this.selectTimeCourses = [];
      this.$store.dispatch('Farm/GET_LIST_BY_TYPE', { id: this.formData.idClient, type: this.typeSheet.id });
    },

    onChangeFarm() {
      this.formShow = false;
      this.selectHydrometer = [];
      this.selectTimeCourses = [];
      this.formData.idHydrometer = null;
      this.formData.idTimesCourses = null;

      this.$store.dispatch('Farm/GET_ITEM', this.formData.idFarm);
      this.$store.dispatch('Hydrometer/GET_LIST', this.formData.idFarm);
    },

    onChangeHydrometer() {
      this.formShow = false;
      this.selectTimeCourses = [];
      this.formData.idTimesCourses = null;
      this.$store.dispatch('TimeCourses/GET_LIST');
    },

    onChangeTimeCourses() {
      const data = {
        idTimesCourses: this.formData.idTimesCourses,
        idHydrometers: this.formData.idHydrometer
      };

      this.getDataFlow();
      this.$store.dispatch('Level/GET_ITEM_DATA', data);
      this.formShow = true;
    },

    getDataFlow() {

      const dataFlow = {
        idClient: this.formData.idClient,
        idFarm: this.formData.idFarm,
        idHydrometer: this.formData.idHydrometer,
        idTimesCourses: this.formData.idTimesCourses
      };

      this.$store.dispatch('FlowSheet/GET_LIST', dataFlow);
    },

    newData() {
      this.$store.dispatch('FlowSheet/SET_DATA', this.formData);
    },

    delData(params) {
      this.$swal.fire({
        title: 'Excluir dados',
        text: `Excluir lançamento do dia ${params.calculationDateBR}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim excluir',
        cancelButtonText: 'Não, cancelar!',
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('FlowSheet/SET_DEL', params.id);
            this.getDataFlow();
          }
        })
    },
  }


}
