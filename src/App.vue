<template>
  <div class="container">
    <form-csv @onUpdateDate="updateDate"/>

    <chart
      :points-to-create-chart="pointsToCreateChart"
      :points-to-test="pointsToTest"
      :isEnoughData="this.isEnoughData"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import formCsv from '@/components/form-csv'
import clearData from '@/assets/js/clearData.js'
import chart from '@/components/chart'
import { makePoints } from '@/assets/js/operationsHelpers.js'

export default {
  name: 'app',
  components: {
    formCsv,
    chart
  },
  data () {
    return {
      data: [],
      dataNumber: 5,
      pointsNumber: 6
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
    createChart () {
      clearData()
    },
    updateDate (data) {
      this.data = data
      console.log('data from app', data)
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
</style>
