<template>
  <div class="">
    <h1 class="title">Statistical Process Control - control chart</h1>
    <form-component @createChart="createChart"/>
    <div class="container">
      points: {{ points }}
      <br>
      <br>
      centerValue: {{ centerValue }}
      <br>
      <br>
      standard deviation: {{ sigma }}
      <br>
      <br>
      UCL value: {{ valueUCL }}
      <br>
      <br>
      LCL value: {{ valueLCL }}
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import formComponent from '@/components/form'
import { makePoints, countMean, countDeviation, round } from '@/assets/js/helpers.js'
import downloadCSV from '@/assets/js/downloadCSV.js'

export default {
  name: 'app',
  components: {
    formComponent
  },
  data () {
    return {
      data: new Array(600).fill().map(() => _.random(0, 1e3)),
      points: [],
      centerValue: 0,
      sigma: 0
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
  methods: {
    createChart (dataNumber, pointsNumber) {
      this.points = makePoints(this.data, dataNumber)

      const pointsToCreateChart = this.points.splice(0, pointsNumber)
      const restPoints = this.points.splice(-pointsNumber)

      this.centerValue = countMean(pointsToCreateChart)
      this.sigma = countDeviation(pointsToCreateChart, this.centerValue)

      downloadCSV()
    }
  }
}
</script>

<style lang="css">
  body {
    background-color: #444;
    color: #eee;
    font-family: 'Lato', sans-serif;
  }

  .title {
    text-align: center;
    font-weight: 700;
    margin-bottom: 40px;
  }
</style>
