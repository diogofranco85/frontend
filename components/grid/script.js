import VueJsonToCsv from 'vue-json-to-csv'
import moment from 'moment'

export default {
  data() {
    return {
      search: ''
    }
  },
  props: {
    exportarExcel: {
      type: Boolean,
      default: true
    },
    titulo: String,
    headers: Array,
    items: {
      type: Array,
      default: [],
    },
    loading: Boolean,
    textoToolTipAcao: String,
    eventoDetalhar: Function,
    cols: String,
    groupby: Array,
    hidedefaultheader: Boolean,
    showgroupby: Boolean,
    handleBtnNovo: Function,
    handleBtnAtualizar: Function,
    actions: Array,
    evento1: Function,
    evento2: Function,
    evento3: Function,
    evento4: Function,
    evento5: Function,
    evento6: Function,
    toolbarColor: String,
  },
  components: {
    VueJsonToCsv,
    moment
  },
  methods: {
    pesquisarGRID(value, search, item) {
      search = search.toString().toLocaleUpperCase()
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value
          .toString()
          .toLocaleUpperCase()
          .includes(search)
      )
    },
    detalharItem(item) {
      this.eventoDetalhar(item)
    },
    detalharAction(acao, item) {
      switch (acao.evento) {
        case 1:
          this.evento1(item)
          break
        case 2:
          this.evento2(item)
          break
        case 3:
          this.evento3(item)
          break
        case 4:
          this.evento4(item)
          break
        case 5:
          this.evento5(item)
          break
        case 6:
          this.evento6(item)
          break
        default:
          break
      }
    },
    getDate() {
      return (
        this.$route.name +
        '_' +
        moment(new Date()).format('YYYY-MM-DD_hh_mm_ss')
      )
    }
  }
}
