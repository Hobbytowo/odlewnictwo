<template>
  <div class="container">
    <form-csv/>
    <chart/>
  </div>
</template>

<script>
import _ from 'lodash'
import formCsv from '@/components/form-csv'
import chart from '@/components/chart'
import { store } from './store/index.js'

export default {
  name: 'app',
  components: {
    formCsv,
    chart
  }
}
</script>

<style lang="scss">
  body {
    background-color: #444;
    color: #eee;
    font-family: 'Lato', sans-serif;
  }
</style>
