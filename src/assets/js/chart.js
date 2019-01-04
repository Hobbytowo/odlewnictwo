import { Bar } from 'vue-chartjs'
// eslint-disable-next-line
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
import { round } from '@/assets/js/operationsHelpers'
import showMessage from '@/assets/js/chartPlugins/message'

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
      showMessage(this, 'test text')

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
        // lines and areas
        annotation: {
          annotations: [
            {
              // center line
              drawTime: "afterDatasetsDraw",
              id: "centerLine",
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.centerValue,
              borderColor: "black",
              borderWidth: 3,
              label: {
                backgroundColor: "green",
                content: "center",
                enabled: true
              }
              // e/o center line
            },
            {
              // UCL line
              drawTime: "afterDatasetsDraw",
              id: "uclLine",
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.valueUCL,
              borderColor: "black",
              borderWidth: 3,
              label: {
                backgroundColor: "red",
                content: "UCL",
                enabled: true
              }
            // e/o UCL line
            },
            {
            // LCL line
              drawTime: "afterDatasetsDraw",
              id: "lclLine",
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: this.valueLCL,
              borderColor: "black",
              borderWidth: 3,
              label: {
                backgroundColor: "red",
                content: "LCL",
                enabled: true
              }
            // e/o LCL line
            },


            // box from 3σ to 2σ

            { // upper area
              drawTime: "afterDatasetsDraw",
              type: "box",
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
              yMin: this.valueUCL,
              yMax: this.valueUCL - this.sigma,
              backgroundColor: "rgba(180, 0, 0, 0.2)",
              borderWidth: 0
            }, // e/o upper area
            { // lower area
              drawTime: "afterDatasetsDraw",
              type: "box",
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
              yMin: this.valueLCL,
              yMax: this.valueLCL + this.sigma,
              backgroundColor: "rgba(180, 0, 0, 0.2)",
              borderWidth: 0
            }, // e/o lower area
            // e/o box from 3σ to 2σ


            // box from 2σ to 1σ
            { // upper area
              drawTime: "afterDatasetsDraw",
              type: "box",
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
              yMax: this.valueUCL - this.sigma,
              yMin: this.centerValue + this.sigma,
              backgroundColor: "rgb(255, 170, 60, 0.2)",
              borderWidth: 0
            }, // e/o upper area
            { // lower area
              drawTime: "afterDatasetsDraw",
              type: "box",
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
              yMin: this.valueLCL + this.sigma,
              yMax: this.centerValue + this.sigma,
              backgroundColor: "rgba(255, 170, 60, 0.2)",
              borderWidth: 0
            }, // e/o lower area
            // e/o box from 2σ to 1σ


            // box 1σ
            {
              drawTime: "afterDatasetsDraw",
              type: "box",
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
              yMin: this.centerValue + this.sigma,
              yMax: this.centerValue - this.sigma,
              backgroundColor: "rgb(146, 244, 66, 0.2)",
              borderWidth: 0
            }
            // e/o box 1σ
          ]
          // e/o lines and areas
        }
        // e/o options
      })
    }
  },
  watch: {
    chartData () {
      this.$data._chart.destroy()
      this.renderSpcChart()
    }
  }
}
