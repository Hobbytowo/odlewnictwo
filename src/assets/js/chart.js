import { Bar } from 'vue-chartjs'
// eslint-disable-next-line
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
// eslint-disable-next-line
import chartjsPluginZoom from "chartjs-plugin-zoom";
import { round } from '@/assets/js/operationsHelpers'
import showMessage from '@/assets/js/chartPlugins/message'
import clearChart from '@/assets/js/chartPlugins/clearChart'
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
    },
    pointsColors () {
      return this.chartData.map(x => {
        return (x > this.valueUCL || x < this.valueLCL)
          ? 'red'
          : 'green'
      })
    }
  },
  mounted () {
    this.renderSpcChart()
  },
  methods: {
    renderSpcChart () {
      // if there is not enough data
      if (!this.isEnoughData) {
        showMessage(this, 'Not enough data to create chart')
        this.renderChart({ labels: []}, { maintainAspectRatio: false })

        return
      }
      // e/o if there is not enough data

      // if there is enough data
      this.renderChart({
        labels: new Array(this.chartData.length).fill().map((x, i) => i),
        datasets: [
          {
            type: 'scatter',
            label: 'point',
            pointBackgroundColor: this.pointsColors,
            backgroundColor: 'transparent',
            data: this.chartData
          }
        ],
      },
      // options
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        annotation: createAnnotations(this.centerValue, this.valueUCL, this.valueLCL, this.sigma),
        // zoom
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              min: this.chartData.length - 15,
              max: this.chartData.length - 1,
              stepSize: 0.4
            },
            scaleLabel: {
              display: true
            }
          }]
        },
        pan: {
          enabled: true,
          mode: 'x'
        },
        zoom: {
          enabled: true,
          mode: 'x',
        },
        // e.o zoom
      })
      // e/o options
      // e/o if there is enough data
    }
  },
  watch: {
    chartData () {
      clearChart(this)
      this.$data._chart.destroy()
      this.renderSpcChart()
    }
  }
}
