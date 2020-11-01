import Vue from 'vue'
import Vuex from 'vuex'
import { makePoints, countMean, countDeviation } from '@/assets/js/operationsHelpers.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    data: [],
    dataNumber: 5,
    pointsNumber: 6,
    windowWidth: 15,
    brokenRules: [],
    rules: [
      {
        idx: 1,
        nrOfData: 1,
        name: 'rule 1',
        description: 'Any single data point falls outside the 3σ-limit',
        checked: true
      },
      {
        idx: 2,
        nrOfData: 3,
        name: 'rule 2',
        description: 'Two out of three consecutive points fall beyond the 2σ-limit',
        checked: true
      },
      {
        idx: 3,
        nrOfData: 5,
        name: 'rule 3',
        description: 'Four out of five consecutive points fall beyond the 1σ-limit',
        checked: true
      },
      {
        idx: 4,
        nrOfData: 9,
        name: 'rule 4',
        description: 'Nine consecutive points fall on the same side of the centerline (in zone C or beyond)',
        checked: true
      },
      {
        idx: 5,
        nrOfData: 6,
        name: 'rule 5',
        description: 'Six consecutive points are steadil increasing or decreasing',
        checked: true
      },
      {
        idx: 6,
        nrOfData: 14,
        name: 'rule 6',
        description: 'Fourteen subsequent points alternately going up and down',
        checked: true
      },
      {
        idx: 7,
        nrOfData: 15,
        name: 'rule 7',
        description: 'Fifteen subsequent points in zone C above or below the central line',
        checked: true
      },
      {
        idx: 8,
        nrOfData: 8,
        name: 'rule 8',
        description: 'Eight subsequent points on both sides of the central line, but none of them in zone C',
        checked: true
      },
    ]
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

    // UCL - LCL breakpoints
    valueUCL: (state, getters) => {
      return getters.centerValue + 3 * getters.sigma
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
      return getters.centerValue - 3 * getters.sigma
    }
    // e/o UCL - LCL breakpoint
  },

  mutations: {
    updateData: (state, data) => {
      state.data = data
    },
    updateSelectedRules: (state, rules) => {
      state.rules = rules
    },
    updateWindowWidth: (state, width) => {
      state.windowWidth = width
    },
    updateRulesStatus: (state, rulesStatus) => {
      state.brokenRules = rulesStatus
    }
  }
})
