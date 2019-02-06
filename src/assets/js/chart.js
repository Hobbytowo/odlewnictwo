import { Bar } from 'vue-chartjs'
// eslint-disable-next-line
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
// eslint-disable-next-line
import chartjsPluginZoom from "chartjs-plugin-zoom";
import showMessage from '@/assets/js/chartPlugins/message'
import clearChart from '@/assets/js/chartPlugins/clearChart'
import createAnnotations from '@/assets/js/chartPlugins/annotations'
import checkRulesForLastPoints from '@/assets/js/rulesForLastPoints'

export default {
  extends: Bar,
  data () {
    return {
      breakRules: []
    }
  },
  computed: {
    chartData () {
      return this.$store.getters.pointsToTest
    },
    pointsColors () {
      return this.chartData.map(x => {
        return (x > this.$store.getters.valueUCL || x < this.$store.getters.valueLCL)
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
      if (!this.$store.getters.isEnoughData) {
        showMessage(this, 'Not enough data to create chart')
        this.renderChart({ labels: []}, { maintainAspectRatio: false })

        return
      }
      // e/o if there is not enough data

      // if there is enough data
      this.renderChart({
        labels: new Array(this.chartData.length).fill().map((x, i) => i + 1),
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
        annotation: createAnnotations(this.$store.getters),
        // zoom
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              min: this.chartData.length - 14,
              max: this.chartData.length,
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

      this.checkRules()
    },
    checkRules () {
      this.breakRules = checkRulesForLastPoints(this.$store)

      if (!this.breakRules) return // no break rules
      else this.clearData()
    },
    clearData () {
      console.log('clear', this.breakRules)
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
