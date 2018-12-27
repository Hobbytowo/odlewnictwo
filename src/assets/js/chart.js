import { Bar } from 'vue-chartjs'

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
    uclValue: {
      type: Number,
      required: true
    },
    lclValue: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.renderChart({
      labels: new Array(this.chartData.length).fill().map((x, i) => i),
      datasets: [
        {
          type: 'scatter',
          label: 'GitHub Commits',
          data: this.chartData
        },
        {
          type: 'line',
          label: 'center value',
          data: new Array(this.chartData.length).fill(this.centerValue)
        },
        {
          type: 'line',
          label: 'UCL value',
          data: new Array(this.chartData.length).fill(this.uclValue)
        },
        {
          type: 'line',
          label: 'LCL value',
          data: new Array(this.chartData.length).fill(this.lclValue)
        }
      ]
    })
  }
}
