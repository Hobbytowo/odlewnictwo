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

export default {
  name: 'app',
  components: {
    formComponent
  },
  data () {
    return {
      data: new Array(600).fill().map(() => Math.round(Math.random() * 10000) / 100),
      points: [],
      centerValue: 0,
      sigma: 0
    }
  },
  computed: {
    valueUCL () {
      return Math.round((this.centerValue + 3 * this.sigma) * 1000) / 1000
    },
    valueLCL () {
      return Math.round((this.centerValue - 3 * this.sigma) * 1000) / 1000
    }
  },
  methods: {
    createChart (dataAmount, pointsAmount) {
      this.points = this.makePoint(dataAmount)

      const pointsToCreateChart = this.points.splice(0, pointsAmount)
      const restPoints = this.points.splice(-pointsAmount)

      this.centerValue = this.countMean(pointsToCreateChart)
      this.sigma = this.countDeviation(pointsToCreateChart)
    },
    makePoint (dataAmount) {
      return _.chunk(this.data, dataAmount).map(data => {
        return Math.round(_.mean(data) * 100) / 100
      })
    },
    countMean (points) {
      return Math.round(_.mean(points) * 100) / 100
    },
    countDeviation (points) {
      const powers = points.map(point => {
        return Math.pow((point - this.centerValue), 2)
      })

      return Math.round(Math.sqrt(_.sum(powers) / points.length) * 1000) / 1000
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
