<template>
  <div class="">
    <h1 class="title">Statistical Process Control - control chart</h1>
    <form-component @createChart="createChart"/>
    <div class="container">
      points: {{ points }}
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
      mean: 0
    }
  },
  methods: {
    createChart (dataAmount, pointsAmount) {
      this.points = _.chunk(this.data, dataAmount).map(data => {
        return Math.round(_.mean(data) * 100) / 100
      })

      this.mean = Math.round(_.mean(this.points.splice(0, pointsAmount)) * 100) / 100
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
