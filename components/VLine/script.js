import { Line, mixins } from 'vue-chartjs';
import labels from 'chartjs-plugin-labels'
import { getRandomColor, hex2rgba } from '~/utils/randomColor';

const { reactiveProp } = mixins;

export default {
  name: "VLine",
  extends: Line,
  components: {
    labels,
  },
  mixins: [reactiveProp],
  data: () => ({
    chartData: [],
    chartLegends: [],
  }),

  props: {
    dataset: { type: Array, default: {} },
    legends: Array,
    options: Array
  },

  mounted() {

  },

  methods: {

    getChart() {
      this.chartData = [];
      this.chartLegends = [];

      if (this.dataset.length > 0) {
        this.dataset.map(item => {
          this.labels.push(item.labels);
          this.chartData.push(item.data);
        })
      }
    }

  }
}
