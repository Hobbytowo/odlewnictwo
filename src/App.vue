<template>
  <div class="">
    <h1 class="title">Statistical Process Control - control chart</h1>
    <form-component @createChart="createChart"/>
    <chart
      :points-to-create-chart="pointsToCreateChart"
      :points-to-test="points"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import formComponent from '@/components/form'
import chart from '@/components/chart'
import { makePoints } from '@/assets/js/helpers.js'

export default {
  name: 'app',
  components: {
    formComponent,
    chart
  },
  data () {
    return {
      data: new Array(600).fill().map(() => _.random(0, 1e3)),
      points: [],
      pointsToCreateChart: []
    }
  },
  methods: {
    createChart (dataNumber, pointsNumber) {
      this.points = makePoints(this.data, dataNumber)
      this.pointsToCreateChart = this.points.splice(0, pointsNumber)
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
