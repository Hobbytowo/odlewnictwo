<template>
  <div class="">
    <h1 class="title">Statistical Process Control - control chart</h1>
    <form-component @createChart="createChart"/>
    <chart
      :points-to-create-chart="pointsToCreateChart"
      :points-to-test="pointsToTest"
      :isEnoughData="this.isEnoughData"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import formComponent from '@/components/form'
import chart from '@/components/chart'
import { makePoints } from '@/assets/js/operationsHelpers.js'

export default {
  name: 'app',
  components: {
    formComponent,
    chart
  },
  data () {
    return {
      data: new Array(600).fill().map(() => _.random(0, 1e3)),
      dataNumber: 0,
      pointsNumber: 0
    }
  },
  computed: {
    points () {
      return makePoints(this.data, this.dataNumber)
    },
    pointsToCreateChart () {
      return [...this.points].splice(0, this.pointsNumber)
    },
    pointsToTest () {
      return  [...this.points].splice(this.pointsNumber)
    },
    isEnoughData () {
      return ((this.dataNumber * this.pointsNumber) <= this.data.length)
    }
  },
  methods: {
    createChart (dataNumber, pointsNumber) {
      this.dataNumber = dataNumber
      this.pointsNumber = pointsNumber
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
