import { Bar } from 'vue-chartjs'
// eslint-disable-next-line
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import { round } from '@/assets/js/operationsHelpers'
import showMessage from '@/assets/js/chartPlugins/message'
import createAnnotations from '@/assets/js/chartPlugins/annotations'

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Array,
      required: true
    },
    centerValue: {
      type: Number,
      required: true
    },
    sigma: {
      type: Number,
      required: true
    },
    isEnoughData: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    valueUCL () {
      return round((this.centerValue + 3 * this.sigma), 3)
    },
    valueLCL () {
      return  round((this.centerValue - 3 * this.sigma), 3)
    }
  },
  mounted () {
    this.renderSpcChart()
  },
  methods: {
    renderSpcChart () {
      if (!this.isEnoughData) { // if there is not enough data
        showMessage(this, 'Not enough data to create chart')
        this.renderChart({
          labels: new Array(this.chartData.length).fill().map((x, i) => i)
        }, { maintainAspectRatio: false })
        return
      }

      // if there is not enough data
      this.renderChart({
        labels: new Array(this.chartData.length).fill().map((x, i) => i),
        datasets: [
          {
            type: 'scatter',
            label: 'point',
            pointBackgroundColor: 'green',
            data: this.chartData
          }
        ],
      },
      // options
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        annotation: createAnnotations(this.centerValue, this.valueUCL, this.valueLCL, this.sigma)
      })
      // e/o options
    }
  },
  watch: {
    chartData () {
      this.$data._chart.destroy()
      this.renderSpcChart()
    }
  }
}
