import Vue from 'vue'
import Vuex from 'vuex'
import { makePoints, countMean, countDeviation, round } from '@/assets/js/operationsHelpers.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    data: [],
    dataNumber: 5,
    pointsNumber: 6
  },

  getters: {
    points: state => {
      return makePoints(state.data, state.dataNumber)
    },
    pointsToCreateChart: (state, getters) => {
      return [...getters.points].slice(0, state.pointsNumber)
    },
    pointsToTest: (state, getters) => {
      return [...getters.points].slice(state.pointsNumber)
    },
    isEnoughData: state => {
      return ((state.dataNumber * state.pointsNumber) <= state.data.length)
    },
    centerValue: (state, getters) => {
      return getters.isEnoughData && countMean(getters.pointsToCreateChart)
    },
    sigma: (state, getters) => {
      return getters.isEnoughData && countDeviation(getters.pointsToCreateChart, getters.centerValue)
    },

    // UCL - LCL brakpoints
    valueUCL: (state, getters) => {
      return round((getters.centerValue + 3 * getters.sigma), 3)
    },
    value2SigmaUpper: (state, getters) => {
      return getters.valueUCL - getters.sigma
    },
    value1SigmaUpper: (state, getters) => {
      return getters.centerValue + getters.sigma
    },
    value1SigmaLower: (state, getters) => {
      return getters.centerValue - getters.sigma
    },
    value2SigmaLower: (state, getters) => {
      return getters.value1SigmaLower - getters.sigma
    },
    valueLCL: (state, getters) => {
      return round((getters.centerValue - 3 * getters.sigma), 3)
    }
    // e/o UCL - LCL brakpoint
  },

  mutations: {
    updateData: (state, data) => {
      state.data = data
    }
  }
})
