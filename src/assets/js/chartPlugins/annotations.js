export default function createAnnotations (getters) {
  return {
    annotations: [
      {
        // center line
        drawTime: "afterDatasetsDraw",
        id: "centerLine",
        type: "line",
        mode: "horizontal",
        scaleID: "y-axis-0",
        value: getters.centerValue,
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
        value: getters.valueUCL,
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
        value: getters.valueLCL,
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
        yMin: getters.valueUCL,
        yMax: getters.value2SigmaUpper,
        backgroundColor: "rgba(180, 0, 0, 0.2)",
        borderWidth: 0
      }, // e/o upper area
      { // lower area
        drawTime: "afterDatasetsDraw",
        type: "box",
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: getters.valueLCL,
        yMax: getters.value2SigmaLower,
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
        yMax: getters.value2SigmaUpper,
        yMin: getters.value1SigmaUpper,
        backgroundColor: "rgb(255, 170, 60, 0.2)",
        borderWidth: 0
      }, // e/o upper area
      { // lower area
        drawTime: "afterDatasetsDraw",
        type: "box",
        xScaleID: "x-axis-0",
        yScaleID: "y-axis-0",
        yMin: getters.value2SigmaLower,
        yMax: getters.value1SigmaLower,
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
        yMin: getters.value1SigmaUpper,
        yMax: getters.value1SigmaLower,
        backgroundColor: "rgb(146, 244, 66, 0.2)",
        borderWidth: 0
      }
      // e/o box 1σ
    ]
  }
}
