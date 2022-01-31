import { Doughnut } from 'vue-chartjs'
import labels from 'chartjs-plugin-labels'

export default {
  extends: Doughnut,
  components: {
    labels,
  },
  data() {
    return {
      labels: [],
      elements: [],
      datasets: [],
      values: [],
      cores: [],
    }
  },
  props: {
    dados: Array,
    loading: Boolean,
    handlegrafic: Function,
    labelRender1: String,
    labelRender2: String,
    legenda: Boolean,
    titulo: String,
    tipoPesquisa: String,
  },
  mounted() {
    this.render();
  },
  watch: {
    dados(value, oldValue) {
      if (value !== oldValue) {
        this.render()
      }
    },
  },
  methods: {
    render() {

      this.labels = []
      this.elements = []
      this.values = []
      this.cores = []
      this.datasets = []

      if (this.dados.length > 0 && this.dados !== undefined) {
        this.dados.map((item, index) => {
          this.labels.push(item.descricao)
          this.elements.push(item.total)
          this.values.push(item.iditem)
          this.gradient = this.$refs.canvas
            .getContext('2d')
            .createLinearGradient(0, 0, 600, 0)
          const cor = this.getRandomColor(0)
          this.gradient.addColorStop(0, this.hex2rgba(cor, 0.5))
          this.gradient.addColorStop(0.5, this.hex2rgba(cor, 0.25))
          this.gradient.addColorStop(1, this.hex2rgba(cor, 0))
          // this.cores.push(this.gradient)
          this.cores.push(cor)
        });

        const grafico = {
          backgroundColor: this.cores,
          data: this.elements,
          values: this.values,
        }

        this.datasets.push(grafico)

        this.renderChart(
          {
            labels: this.labels,
            datasets: this.datasets,
          },
          {
            plugins: {
              labels: [
                {
                  render: this.labelRender1,
                  fontColor: '#000',
                  fontSize: 10,
                },
                {
                  render: this.labelRender2,
                  position: 'outside',
                  fontColor: '#000',
                  fontSize: 10,
                },
              ],
            },
            legend: {
              display: this.legenda,
              position: 'bottom',
              labels: {
                fontSize: 10,
                padding: 0.4,
                usePointStyle: true,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
            render: 'value',
            onClick: this.handle,
            title: {
              display: true,
              text: this.titulo,
              padding: 6,
              fontColor: 'black',
              fontSize: 14,
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 20,
              },
            },
          }
        )
      }
    },
    handle(point, event) {
      const item = event[0]

      if (item === undefined) {
        return
      }

      const param = {
        tipoPesquisa: this.tipoPesquisa,
        elemento: this.values[item._index],
      }

      this.handlegrafic(param)
    },
    getRandomColor(inicio) {
      const letters = '0123456789ABCDEF'
      let color = '#'
      let numero = 0
      if (inicio === 0) {
        let inverter = true
        for (let i = 0; i < 6; i++) {
          numero = Math.random() * 16
          if (inverter === true) {
            numero = 16 - numero
            inverter = false
          } else {
            inverter = true
          }
          color += letters[Math.floor(numero)]
        }
      } else {
        color += letters[inicio]
        for (let i = 0; i < 5; i++) {
          numero = Math.random()
          color += letters[Math.floor(numero * 16)]
        }
      }
      return color
    },
    hex2rgba(hex, alpha = 1) {
      const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16))
      return `rgba(${r},${g},${b},${alpha})`
    },
  },
}
