import { mapGetters } from 'vuex';
import { swal } from '~/utils/alert';
import moment from 'moment';
import { round } from 'lodash';

export default {
  data: () => ({
    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Planilha', to: "/sheets", disabled: true },
    ],
    formShow: false,
    formData: {
      idClient: null,
      idFarm: null,
      idTimesCourses: null,
      idTypeMeter: null,
      calculationDate: null,
      idMeter: null,
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

    itemGridMeterList: [],
    datagrid: []
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
      flowSheetsItem: 'FlowSheet/getItem',
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
        this.formData.idMeter = value ? value.id : null;
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
        this.datagrid = this.calculateFlow(value);
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
          this.loadSheet();
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
    this.selectFarm = [];
    this.selectTimeCourses = [];
    this.$store.dispatch('DescriptiveItems/GET_BY_KEY', data);
    this.$store.dispatch('FlowSheet/CLEAR_DATA');
  },


  methods: {
    loadClient() {
      this.$store.dispatch('HydromterFlow/CLEAR_DATA');
      this.$store.dispatch('Client/GET_LIST');
      this.clearField();
    },

    onChangeTypeMeter() {
      this.formShow = false;
      this.formData.idFarm = null;
      this.formData.idClient = null;
      this.formData.idTimesCourses = null;
      this.formData.calculationDate = null;
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
      this.clearField();

      this.formShow = false;
      this.fieldsetView = true;

      this.$store.dispatch('HydromterFlow/GET_LIST', {
        idTypeMeter: this.formData.idTypeMeter,
        idFarm: this.formData.idFarm
      });

      this.$store.dispatch('Meter/GET_ITEM_FLOW', {
        idTypeMeter: this.formData.idTypeMeter,
        idFarm: this.formData.idFarm
      });

      this.loadSheet();

      this.formData.calculationDate = this.formatDate(Date.now());
    },

    loadSheet() {
      const data = {
        client: this.formData.idClient,
        meter: this.formData.idTypeMeter,
        timeCourses: this.formData.idTimesCourses,
        farm: this.formData.idFarm,
        dateInclude: this.formData.calculationDate
      }

      this.$store.dispatch('FlowSheet/GET_LIST', data);
    },

    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },

    async addMeter() {

      let error = false;

      if (this.field.id.length > 0) {
        this.field.id.map((item, index) => {
          console.log([this.field.hour[index], this.field.hydro[index]])
          if (this.field.hour[index] == '' || this.field.hydro[index] == '' || this.field.hour[index] == undefined || this.field.hydro[index] == undefined) {
            this.$swal.fire({
              title: 'Validação de campos',
              text: 'Existe campos sem preencher',
              type: 'error'
            })
            error = true;
            return;
          }
        })
      }

      if (error)
        return;

      const data = {
        meter: this.formData,
        data: { ...this.field }
      };

      this.$store.dispatch('FlowSheet/SET_DATA', data);
    },

    delData(params) {
      console.log(params);
      this.$swal.fire({
        title: 'Excluir dados',
        text: `Excluir lançamento do dia ${params.dateInclude}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim excluir',
        cancelButtonText: 'Não, cancelar!',
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('FlowSheet/SET_DEL', params.id);
            this.loadSheet();
          }
        })
    },

    calculateFlow(value) {

      const { data, previous } = value;

      if (value.length == 0)
        return [];

      let redux;
      let listItem = [];
      let tempList = [];

      let sumHour = 0;
      let sumHori = 0;

      let sumMedHour = 0;
      let sumMedHori = 0;

      let volume = 0;


      data.map((item, index) => {
        item.flowItems.map((listHidro, cont) => {
          if (index == 0) {

            if (previous.length == 0) {
              redux = {
                initialHydroValue: listHidro.Hydrometer.initialHydroValue.toFixed(2),
                initialHourValue: listHidro.Hydrometer.initialHourValue.toFixed(2)
              }
            }

            previous.map(p => {
              if (listHidro.Hydrometer.id == p.Hydrometer.id) {
                redux = {
                  initialHydroValue: p.horimeter,
                  initialHourValue: p.hourmeter
                };
              }
            })

            tempList.push({
              id: listHidro.id,
              horimeter: listHidro.horimeter.toFixed(3),
              hourmeter: listHidro.hourmeter.toFixed(3),
              ...redux
            })

            sumHori = sumHori + (listHidro.horimeter - redux.initialHydroValue);
            sumHour = sumHour + (listHidro.hourmeter - redux.initialHourValue);
            sumMedHour = sumMedHour + listHidro.hourmeter;
            sumMedHori = sumMedHori + listHidro.horimeter;


          } else {

            let idx = (index - 1);
            sumHori = sumHori + (listHidro.horimeter - data[idx].flowItems[cont].horimeter);
            sumHour = sumHour + (listHidro.hourmeter - data[idx].flowItems[cont].hourmeter);

            sumMedHori = sumMedHori + data[idx].flowItems[cont].horimeter;
            sumMedHour = sumMedHour + data[idx].flowItems[cont].hourmeter;

            tempList.push({
              id: item.id,
              dateInclude: item.dateIncludeBR,
              horimeter: listHidro.horimeter.toFixed(3),
              hourmeter: listHidro.hourmeter.toFixed(3),
              initialHydroValue: listItem[idx].horimeter,
              initialHourValue: listItem[idx].hourmeter,
            })
          }
        })

        listItem.push({
          id: item.id,
          dateInclude: item.dateIncludeBR,
          meter: item.meter,
          items: { ...tempList },
          calcHori: sumHori ? sumHori.toFixed(1) : 0,
          calcHour: sumHour ? sumHour.toFixed(1) : 0,
          media: (sumMedHori / sumMedHour).toFixed(2),
        });

        volume = volume + sumHori;
        sumHori = 0;
        sumHour = 0;
        sumMedHori = 0;
        sumMedHour = 0;

        tempList = [];

      })

      const result = {
        data: { ...listItem },
        days: listItem.length,
        volume: volume.toFixed(1)
      };

      console.log(result);

      return result;

    },

    clearField() {
      this.field.id = [];
      this.field.hour = [];
      this.field.hydro = [];
    }
  }


}
