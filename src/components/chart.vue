<template lang="html">
  <div class="">
    <div class="container">
      <spc-chart
        :chart-data="pointsToTest"
        :center-value="centerValue"
        :ucl-value="valueUCL"
        :lcl-value="valueLCL"
      />
    </div>
  </div>
</template>

<script>
import spcChart from '@/assets/js/chart.js'
import { countMean, countDeviation, round } from '@/assets/js/helpers.js'

export default {
  props: {
    pointsToCreateChart: {
      type: Array,
      required: true
    },
    pointsToTest: {
      type: Array,
      default: () => []
    }
  },
  components: {
    spcChart
  },
  computed: {
    centerValue () {
      return countMean(this.pointsToCreateChart)
    },
    sigma () {
      return countDeviation(this.pointsToCreateChart, this.centerValue)
    },
    valueUCL () {
      return round((this.centerValue + 3 * this.sigma), 3)
    },
    valueLCL () {
      return  round((this.centerValue - 3 * this.sigma), 3)
    }
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId)
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: #ddd;
    padding: 50px;
    margin: 20px 50px;
  }
</style>
