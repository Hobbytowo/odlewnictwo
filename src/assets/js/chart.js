import { Bar } from 'vue-chartjs'
// eslint-disable-next-line
import chartjsPluginAnnotation from "chartjs-plugin-annotation";

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
          label: 'point',
          pointBackgroundColor: 'green',
          data: this.chartData
        }
      ],
    },
    // options
    {
      title: {
        display: true,
        text: "SPC Chart"
      },
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
            value: this.uclValue,
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
            value: this.lclValue,
            borderColor: "black",
            borderWidth: 3,
            label: {
              backgroundColor: "red",
              content: "LCL",
              enabled: true
            }
          // e/o LCL line
          }
        ]
      }
    }
    // e/o options
  )}
}
