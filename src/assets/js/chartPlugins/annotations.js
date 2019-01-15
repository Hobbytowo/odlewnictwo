export default function createAnnotations (centerValue, valueUCL, valueLCL, sigma) {
  return {
    annotations: [
      {
        // center line
        drawTime: "afterDatasetsDraw",
        id: "centerLine",
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: centerValue,
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
        value: valueUCL,
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
        value: valueLCL,
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
        yMin: valueUCL,
        yMax: valueUCL - sigma,
        backgroundColor: "rgba(180, 0, 0, 0.2)",
        borderWidth: 0
      }, // e/o upper area
      { // lower area
        drawTime: "afterDatasetsDraw",
        type: "box",
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: valueLCL,
        yMax: valueLCL + sigma,
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
        yMax: valueUCL - sigma,
        yMin: centerValue + sigma,
        backgroundColor: "rgb(255, 170, 60, 0.2)",
        borderWidth: 0
      }, // e/o upper area
      { // lower area
        drawTime: "afterDatasetsDraw",
        type: "box",
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: valueLCL + sigma,
        yMax: centerValue + sigma,
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
        yMin: centerValue + sigma,
        yMax: centerValue - sigma,
        backgroundColor: "rgb(146, 244, 66, 0.2)",
        borderWidth: 0
      }
      // e/o box 1σ
    ]
  }
}
