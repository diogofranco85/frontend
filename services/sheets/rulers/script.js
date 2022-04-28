import { mapGetters } from 'vuex';
import { swal, toast } from '~/utils/alert';
import moment from 'moment';
export default {
  data: () => ({
    formRef: null,
    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Planilha', to: "/sheets", disabled: true },
    ],
    selectClient: [],
    selectFarm: [],
    selectTypeMeter: [],
    selectTimeCourses: [],

    fieldsetView: false,

    formData: {
      idClient: null,
      idFarm: null,
      idTimesCourses: null,
      idMeter: null,
      dateInclude: null,
      levelMed: null,
      velMed: null,
      fullSection: null,
      curseWater: null,
    },

    selectClient: [],
    selectFarm: [],
    selectTimeCourses: [],

    itemGridMeterList: [],

    meter: null,

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

      flow: 'FlowRules/getData',
      flowItems: 'FlowRules/getItem',
      message: 'FlowRules/getMessage',
      error: 'FlowRules/getError',
      loading: 'FlowRules/getLoading',

      fullValue: 'FullSection/getItem',

      meterItem: 'Meter/getItem',
      meterData: 'Meter/getData',

      meterList: 'DescriptiveItems/getData'
    })
  },

  watch: {

    message(value) {
      if (value !== '') {
        if (this.error === true) {
          swal(this, value, 'error');
        } else {
          swal(this, value);
          this.loadSheet();
        }
      }
    },

    fullValue(value) {
      if (value) {
        this.formData.fullSection = value.area
      }
    },

    meterItem(value) {
      if (value != {}) {
        this.meter = value.id;
        this.formData.idMeter = value ? value.id : null;
        this.itemGridMeterList = [
          { ...value }
        ];
      }
    },

    typeSheet(value) {
      if (value) {
        value.map(item => {
          this.formData.idTypeMeter = item.id;
        })
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

  },

  mounted() {
    // this.loadClient();
    const data = ['Residual']
    this.$store.dispatch('FlowRules/CLEAR_DATA');
    this.$store.dispatch('DescriptiveItems/GET_BY_KEY', data);
    this.$store.dispatch('Client/GET_LIST');
  },


  methods: {
    loadClient() {
      this.$store.dispatch('Client/GET_LIST');
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
    },

    onChangeTimeCourse() {
      this.clear();

      this.formShow = false;
      this.fieldsetView = true;
      this.formData.dateInclude = this.formatDate(Date.now());

      this.$store.dispatch('Meter/GET_ITEM_FLOW', {
        idTypeMeter: this.formData.idTypeMeter,
        idFarm: this.formData.idFarm
      });

      this.loadSheet();

    },

    loadSheet() {
      this.$store.dispatch('DescriptiveItems/GET_BY_KEY', ['Residual']);

      const data = {
        client: this.formData.idClient,
        meter: this.formData.idTypeMeter,
        timeCourses: this.formData.idTimesCourses,
        farm: this.formData.idFarm,
        dateInclude: this.formData.dateInclude
      }
      this.$store.dispatch('FlowRules/GET_LIST', data);
    },

    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },

    add() {
      if (this.validate())
        return;

      const velMed = parseFloat(this.formData.velMed);
      const fullsection = parseFloat(this.formData.fullSection);
      this.formData.curseWater = velMed * fullsection;

      this.$store.dispatch('FlowRules/SET_DATA', this.formData);
    },

    del(params) {
      const { id, dateInclude } = params
      this.$swal.fire({
        title: 'Excluir dados',
        text: `Excluir lançamento do dia ${dateInclude}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim excluir',
        cancelButtonText: 'Não, cancelar!',
      })
        .then(result => {
          if (result.value) {
            this.$store.dispatch('FlowRules/SET_DEL', id);
            this.loadSheet();
          }
        })
    },

    getFullSecton() {
      if (this.validate())
        return;

      const data = {
        idFarm: this.formData.idFarm,
        level: this.formData.levelMed
      };

      this.$store.dispatch('FullSection/GET_VALUE', data);
    },

    clear() {
      this.formData.levelMed = null;
      this.formData.velMed = null;
      this.formData.fullSection = null;
      this.formData.curseWater = null;
    },

    validate() {
      if (this.formData.levelMed == null) {
        this.$swal.fire({
          title: 'Validação de campos',
          text: 'Existe campos sem preencher',
          type: 'error'
        })
        return true;
      }

      if (!this.formData.velMed == null) {
        this.$swal.fire({
          title: 'Validação de campos',
          text: 'Existe campos sem preencher',
          type: 'error'
        })
        return true;
      }
    }
  }


}
