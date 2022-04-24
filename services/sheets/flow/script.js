import { mapGetters } from 'vuex';
import { swal, toast } from '~/utils/alert';
import moment from 'moment';
import { get, post } from '../../../utils/api';
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
      levelDynamic: '',
      idTypeMeter: ''
    },

    queryString: {
      idTypeMeter: null,
      idFarm: null,
    },

    limitHourDay: 0,
    limitHorimeterDay: 0,

    selectClient: [],
    selectFarm: [],
    selectTypeMeter: [],
    selectTimeCourses: [],

    flowSheetData: [],

    error: false,
    message: '',

    fieldsetView: false,


    contHidro: 3,

    field: {
      hydro: [],
      hour: [],
      id: [],
    },

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
    ],

    itemGridMeterList: []
  }),

  computed: {
    ...mapGetters({
      typeSheet: 'DescriptiveItems/getData',

      client: 'Client/getData',
      farm: 'Farm/getData',
      hydrometer: 'Hydrometer/getData',
      timeCourses: 'TimeCourses/getData',

      farmItem: 'Farm/getItem',

      clientError: 'Client/getError',
      farmError: 'Farm/getError',
      hydrometerError: 'Hydrometer/getError',
      timeCoursesError: 'TimeCourses/getError',

      clientMessage: 'Client/getMessage',
      farmMessage: 'Farm/getMessage',
      hydrometerMessage: 'Hydrometer/getMessage',
      TimeCoursesMessage: 'TimeCourses/getMessage',

      flowSheets: 'FlowSheet/getData',
      flowSheetsMessage: 'FlowSheet/getMessage',
      flowSheetsError: 'FlowSheet/getError',
      loading: 'FlowSheet/getLoading',

      listHydrometers: 'HydromterFlow/getData',

      meterItem: 'Meter/getItem'
    })
  },

  watch: {
    meterItem(value, oldValue) {
      if (value != oldValue || value != {}) {
        this.itemGridMeterList = [
          { ...value }
        ];
      }
    },
    typeSheet(value, oldValue) {
      if (value != oldValue) {
        value.map(item => {
          this.selectTypeMeter.push({
            text: item.value,
            value: item.id
          })
        })
      }
    },

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
    const data = ['Superficial', 'Underground', 'Curve'];
    this.$store.dispatch('DescriptiveItems/GET_BY_KEY', data);
    this.$store.dispatch('FlowSheet/CLEAR_DATA');
  },


  methods: {
    loadClient() {
      this.$store.dispatch('HydromterFlow/CLEAR_DATA');
      this.$store.dispatch('Client/GET_LIST');
    },

    onChangeTypeMeter() {
      this.formShow = false;
      this.formData.idFarm = null;
      this.formData.idClient = null;
      this.formData.idTimesCourses = null;
      this.fieldsetView = false;
      this.selectFarm = [];
      this.selectClient = []
      this.selectTimeCourses = [];
      this.loadClient();
    },

    onChangeClient() {
      this.formShow = false;
      this.formData.idFarm = null;
      this.fieldsetView = false;
      this.selectFarm = [];
      this.$store.dispatch('Farm/GET_LIST_BY_TYPE', { id: this.formData.idClient, type: this.formData.idTypeMeter });
    },

    onChangeFarm() {
      this.$store.dispatch('TimeCourses/GET_LIST');
      this.$store.dispatch('HydromterFlow/CLEAR_DATA');
    },

    onChangeTimeCourse() {
      this.formShow = false;
      this.fieldsetView = true;

      this.$store.dispatch('HydromterFlow/GET_LIST', {
        idTypeMeter: this.formData.idTypeMeter,
        idFarm: this.formData.idFarm
      });

      this.$store.dispatch('Meter/GET_ITEM', this.formData.idTypeMeter);


      this.formData.calculationDate = this.formatDate(Date.now());
    },


    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },

    async addMeter() {
      await post('/teste/index', this.field, 'COM_TOKEN_USUARIO');
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
