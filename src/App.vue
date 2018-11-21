<template>
  <div class="">
    <h1 class="title">Statistical Process Control - control chart</h1>
    <div class="container">
      {{ points }}
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'app',
  data () {
    return {
      data: new Array(600).fill().map(() => Math.round(Math.random() * 10000) / 100),
      amountOfDataInPoint: 6,
      amountOfPointToCreateChart: 7
    }
  },
  computed: {
    points () {
      return _.chunk(this.data, this.amountOfDataInPoint).map(data => {
        return Math.round(_.mean(data) * 100) / 100
      })
    },
    mean () {
      return Math.round(_.mean(this.points.splice(0, this.amountOfPointToCreateChart)) * 100) / 100
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
  }
</style>
