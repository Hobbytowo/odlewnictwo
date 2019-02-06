// Western Electric rules
// https://en.wikipedia.org/wiki/Western_Electric_rules

export default function checkRules (store) {
  const points = store.getters.pointsToTest
  const breakRules = []

  // rule 1 - Any single data point falls outside the 3σ-limit
  const checkRule1 = () => {
    const point = points.slice(-1)
    if (point > store.getters.valueUCL
     || point < store.getters.valueLCL) {
      breakRules.push('1')
    }
  }
  // e.o rule 1

  // rule 2 - Two out of three consecutive points fall beyond the 2σ-limit
  const checkRule2 = () => {
    const arrToTest = points.slice(-3)

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
      breakRules.push('2')
    }
  }

  // e.o rule 2

  // rule 3 - Four out of five consecutive points fall beyond the 1σ-limit
  const checkRule3 = () => {
    const arrToTest = points.slice(-5)

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
      breakRules.push('3')
    }
  }

  // e.o rule 3

  // rule 4 - Nine consecutive points fall on the same side of the centerline (in zone C or beyond)
  const checkRule4 = () => {
    const arrToTest = points.slice(-9)
    const center = store.getters.centerValue

    if (arrToTest.every(point => point > center)
     || arrToTest.every(point => point < center)) {
      breakRules.push('4')
    }
  }
  // e.o rule 4

  // rule 5 - Six consecutive points are steadil increasing or decreasing
  const checkRule5 = () => {
    const arrToTest = points.slice(-6)

    const checkIncreasing = arr => {
      let increasing = 0
      arr.map((point, idx) => {
        if (idx !== 5 && point < arrToTest[idx + 1]) {
          increasing++
      }})

      return increasing
    }

    const checkDecreasing = arr => {
      let decreasing = 0
      arr.map((point, idx) => {
        if (idx !== 5 && point > arrToTest[idx + 1]) {
          decreasing++
      }})

      return decreasing
    }

    if (checkIncreasing(arrToTest) === 5 || checkDecreasing(arrToTest) === 5) {
      breakRules.push('5')
    }
  }
  // e.o rule 5

  // rule 6 - 14 alternating up/down
  const checkRule6 = () => {
    const arrToTest = points.slice(-14)

    const ifNextIsLower = arr => {
      const decreasing = []
      arr.map((point, idx) => {
        if (idx !== 13) {
          decreasing.push(point > arrToTest[idx + 1])
      }})

      return decreasing
    }

    const booleanArray = ifNextIsLower(arrToTest)

    const firstTrueValuesTrue = booleanArray.filter((x, idx) => x && !(idx % 2))
    const firstTrueValuesFalse = booleanArray.filter((x, idx) => !x && (idx % 2))

    if ((firstTrueValuesTrue.length === 7 && firstTrueValuesFalse.length === 6)
    || (firstTrueValuesTrue.length === 0 && firstTrueValuesFalse.length === 0)) {
      breakRules.push('6')
    }
  }
  // e.o rule 6

  // rule 7 -	15 consecutive points are within 1 sigma of the center line.
  const checkRule7 = () => {
    const arrToTest = points.slice(-15)

    const max = store.getters.value1SigmaUpper
    const min = store.getters.value1SigmaLower

    const isStratification = arr => {
      return arr.every(x => x >= min && x <= max)
    }

    isStratification(arrToTest) && breakRules.push('7')
  }
  // e.o rule 7

  // rule 8 -	8 consecutive points on either side of the center line with not within 1 sigma.
  const checkRule8 = () => {
    const arrToTest = points.slice(-8)

    const max = store.getters.value1SigmaUpper
    const min = store.getters.value1SigmaLower

    const isMixture = arr => {
      return arr.every(x => x < min || x > max)
    }

    isMixture(arrToTest) && breakRules.push('8')
  }
  // e.o rule 8

  // invoke functions
  const pointsLength = points.length
  pointsLength > 0 && checkRule1() // outside 3sigma (1 points)
  pointsLength > 2 && checkRule2() // 2 out of 3
  pointsLength > 4 && checkRule3() // 4 out of 5
  pointsLength > 8 && checkRule4() // on the same side (9)
  pointsLength > 5 && checkRule5() // desc / asc (6)
  pointsLength > 13 && checkRule6() // alternating (14)
  pointsLength > 14 && checkRule7() // stratification (15)
  pointsLength > 7 && checkRule8() // mixture (8)
  // e/o invoke functions

  return breakRules
}
