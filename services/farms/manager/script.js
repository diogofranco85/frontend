import { mapGetters } from 'vuex';
export default {
  middleware: ['auth'],
  data: () => ({
    showLevel: false,
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

    formAction: 'new',

    items: [
      { text: 'Home', to: "/home", nuxt: true },
      { text: 'Clientes', to: "/clients", nuxt: true },
      { text: 'Fazendas', to: 'farm', nuxt: true },
      { text: 'Gerenciar', to: "/farms-manager", disabled: true },
    ],

    latitude: 0,
    longitude: 0,
    hydrometerHeader: [
      { text: 'Cód', value: 'id', class: 'blue-grey lighten-4' },
      { text: 'Identificador', value: 'identifier', class: 'blue-grey lighten-4' },
      { text: 'TAG', value: 'tag', class: 'blue-grey lighten-4' },
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

    formMeterRef: null,

    meterModal: false,
    meterData: {
      id: '',
      idFarm: '',
      idTypeMeter: '',
      idOutorga: '',
      levelStatic: '',
      levelDynamic: '',
      valueHydrometer: '',
      valueHourley: '',
      volMaxMouth: '',
      volMaxDay: '',
      hourMaxDay: '',
      levelMinResidualFlow: '',
    },

    farmData: {
      name: '',
      latitude: '',
      longitude: '',
    },

    selectOutorgas: [],
    selectTypeMeter: [],

    formHydrometerEditable: false
  }),

  computed: {
    ...mapGetters({
      getFarm: 'Gerenciar/getFarm',
      message: 'Gerenciar/getMessage',
      error: 'Gerenciar/getError',
      loading: 'Gerenciar/getLoading',

      meterItems: 'Meter/getData',
      meterMessage: 'DescriptiveItems/getMessage',
      meterError: 'DescriptiveItems/getErrors',


      typeMeter: 'DescriptiveItems/getData',



      outorgas: 'Outorgas/getData'
    })
  },

  watch: {

    outorgas(value, oldValue) {
      if (value !== oldValue) {
        value.map(item => {
          this.selectOutorgas.push({
            value: item.id,
            text: item.concierge
          })
        });
      }
    },

    typeMeter(value, oldValue) {
      if (value !== oldValue) {
        value.map(item => {
          this.selectTypeMeter.push({
            value: item.id,
            text: item.value
          })
        });
      }
    },

    MeterItem(value, oldValue) {
      if (value !== oldValue) {
        this.meterForm.id = value.id;
        this.meterForm.idTypeMeter = value.idTypeMeter;
        this.meterForm.idOutorga = value.idOutorga;
        this.meterForm.valueHydrometer = value.valueHydrometer;
        this.meterForm.valueHourley = value.valueHourley;
        this.meterForm.volMaxMounth = value.volMaxMounth;
        this.meterForm.volMaxDay = value.volMaxDay;
        this.meterForm.hourMaxDay = value.hourMaxDay;
        this.meterForm.levelMinResidualFlow = value.levelMinResidualFlow;
        this.meterModal = true;
      }
    },

    getFarm(value) {
      this.farmData = value;
      this.latitude = parseFloat(value.latitude);
      this.longitude = parseFloat(value.longitude);

      this.meterData.idFarm = value.id;

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
  },

  mounted() {
    this.loadData();
    this.mapType = 'hybrid'
  },

  methods: {
    loadData() {
      this.loadMeter();
      this.loadFarm();
    },

    loadFarm() {
      const params = this.$route.params;
      if (!params.id) {
        this.$router.push('/clients');
      }

      this.meterData.idFarm = params.id;

      this.$store.dispatch('Gerenciar/GET_FARM', params.id);
    },

    loadMeter() {
      const params = this.$route.params;
      if (!params.id) {
        this.$router.push('/clients');
      }

      this.$store.dispatch('Meter/GET_DATA', params.id);
    },

    loadOutorgas() {
      const params = this.$route.params;

      if (!params.id) {
        this.$router.push('/clients');
      }

      this.$store.dispatch('Outorgas/GET_FARM', params.id);
    },

    loadTypeMeter() {
      this.$store.dispatch('DescriptiveItems/GET_DATA', { name: 'key-type-meter' });
    },

    clearMeterInput() {
      this.meterData.id = '';
      this.meterData.levelStatic = '';
      this.meterData.levelDynamic = '';
      this.meterData.idTypeMeter = '';
      this.meterData.idOutorga = '';
      this.meterData.valueHydrometer = 0;
      this.meterData.valueHourley = 0;
      this.meterData.volMaxMouth = 0;
      this.meterData.volMaxDay = 0;
      this.meterData.hourMaxDay = 0;
      this.meterData.levelMinResidualFlow = 0;

      if (this.$refs.formMeterRef)
        this.$refs.formMeterRef.reset();
    },

    selectMeter() {
      this.$store.dispatch('DescriptiveItems/GET_ITEM', this.meterForm.idTypeMeter);
    },



    meterModalOpen() {
      this.clearMeterInput()
      this.loadOutorgas();
      this.loadTypeMeter();
      this.meterModal = true;
    },

    meterModalClose() {
      this.meterModal = false;
    },

    meterModalSave() {
      this.$refs.formMeterRef.validate()
        .then(success => {
          if (success) {
            this.$store.dispatch('Meter/SET_DATA', {
              typeOperation: this.formAction,
              data: this.meterData
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

    gridActHidrometro(id) {
      alert('hidro' + id);
    },

    gridActNew() {
      alert('hidro novo');
    },

    gridActEdit(id) {
      alert('edit' + id);
    },

    gridActDelete(id) {
      alert('del' + id);
    }
  }

}
