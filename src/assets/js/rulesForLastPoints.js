// Western Electric rules
// https://en.wikipedia.org/wiki/Western_Electric_rules

export default function checkRules (store) {
  const points = store.getters.pointsToTest

  // rule 1 - Any single data point falls outside the 3σ-limit
  const checkRule1 = () => {
    const point = points[points.length - 1]
    if (point > store.getters.valueUCL
     || point < store.getters.valueLCL) {
      alert('Break rule 1')
    }
  }
  // e.o rule 1

  // rule 2 - Two out of three consecutive points fall beyond the 2σ-limit
  const checkRule2 = () => {
    const arrToTest = []
    points.map((x, i) => i > points.length - 4 && arrToTest.push(x))

    const checkUpper = arr => {
      let missed = 0
      arr.map(point => {
        point > store.getters.value2SigmaUpper && missed++
      })

      return missed
    }

    const checkLower = arr => {
      let missed = 0
      arr.map(point => {
        point < store.getters.value2SigmaLower && missed++
      })

      return missed
    }

    if (checkUpper(arrToTest) > 1 || checkLower(arrToTest) > 1) {
      alert('Break rule 2')
    }
  }

  // e.o rule 2

  // rule 3 - Four out of five consecutive points fall beyond the 1σ-limit
  const checkRule3 = () => {
    const arrToTest = []
    points.map((x, i) => i > points.length - 6 && arrToTest.push(x))

    const checkUpper = arr => {
      let missed = 0
      arr.map(point => {
        point > store.getters.value1SigmaUpper && missed++
      })

      return missed
    }

    const checkLower = arr => {
      let missed = 0
      arr.map(point => {
        point < store.getters.value1SigmaLower && missed++
      })

      return missed
    }

    if (checkUpper(arrToTest) > 3 || checkLower(arrToTest) > 3) {
      alert('Break rule 3')
    }
  }

  // e.o rule 3

  // rule 4 - Nine consecutive points fall on the same side of the centerline (in zone C or beyond)
  const checkRule4 = () => {
    const arrToTest = []
    points.map((x, i) => i > points.length - 10 && arrToTest.push(x))
    const center = store.getters.centerValue

    if (arrToTest.every(point => point > center)
     || arrToTest.every(point => point < center)) {
      alert('Break rule 4')
    }
  }
  // e.o rule 4

  // invoke functions
  points.length > 0 && checkRule1()
  points.length > 2 && checkRule2()
  points.length > 6 && checkRule3()
  points.length > 8 && checkRule4()
  // e/o invoke functions
}
