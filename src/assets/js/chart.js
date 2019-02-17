import {Bar} from 'vue-chartjs'
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
  computed: {
    chartData() {
      return this.$store.getters.pointsToTest
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },
    rules() {
      return this.$store.state.rules
    },
    brokenRules () {
      return this.$store.state.brokenRules
    },
    maxBrokenData () {
      let nrOfData = []
      this.brokenRules.forEach(brokenRuleIdx => {
        nrOfData.push(this.rules[brokenRuleIdx - 1].nrOfData)
      })

      return Math.max(...nrOfData)
    },
    pointsColors() {
      return this.chartData.map((x, idx) => {
        return idx > this.chartData.length - this.maxBrokenData
          ? 'red'
          : 'green'
      })
    }
  },
  mounted() {
    this.renderSpcChart()
  },
  methods: {
    renderSpcChart() {
      // if there is not enough data
      if (!this.$store.getters.isEnoughData) {
        showMessage(this, 'Not enough data to create chart')
        this.renderChart({labels: []}, {maintainAspectRatio: false})

        return
      }
      // e/o if there is not enough data

      // if there is enough data
      checkRulesForLastPoints(this.$store)

      this.$nextTick(() => {
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
            legend: {display: false},
            annotation: createAnnotations(this.$store.getters),
            // zoom
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true,
                  min: this.chartData.length - this.windowWidth - 1,
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
      })

      // e/o if there is enough data
    },
    rerender() {
      clearChart(this)
      this.$data._chart.destroy()
      this.renderSpcChart()
    }
  },
  watch: {
    chartData() {
      this.rerender()
    },
    windowWidth() {
      this.rerender()
    },
    rules() {
      this.rerender()
    }
  }
}
