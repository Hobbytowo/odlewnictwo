<template lang="html">
  <div class="">
    <div class="container">
      <spc-chart class="chart"/>
    </div>
  </div>
</template>

<script>
import spcChart from '@/assets/js/chart.js'

export default {
  components: {
    spcChart
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: #ddd;
    padding: 50px;
    margin: 20px 0;
  }

  .chart {
    cursor: e-resize;
  }
</style>
