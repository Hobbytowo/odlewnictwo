// Western Electric rules
// https://en.wikipedia.org/wiki/Western_Electric_rules

const data = [2,5,8,8,85,10,5,6,5, 3, 4, 6 ,5, 4, 4,4,5,5,8,8,7]

function createArrays (data, numberOfDataInArr) {
  const arr = []
  const arrayNumberOfDataInArr = new Array(numberOfDataInArr).fill().map((x, i) => i)

  for (let i = 0; i <= (data.length - numberOfDataInArr); i++) {
    const smallArr = []
    arrayNumberOfDataInArr.map(j => {
      smallArr.push(data[i + j])
    })

    arr.push(smallArr)
  }

  return arr
}

// rule 1 - Any single data point falls outside the 3σ-limit
export function checkRule1 (values) {
  return values.filter(x => (x > this.valueUCL || x < this.valueLCL))
}
// e.o rule 1

// rule 2 - Two out of three consecutive points fall beyond the 2σ-limit
const zoneAupperBottom = 8
const zoneAlowerTop = 3

export function checkRule2 (values) {
  const isBeyondZoneAUpper = point => point > zoneAupperBottom
  const isBeyondZoneALower = point => point < zoneAlowerTop

  const checkRuleOneUpper = arr => {
    let missed = 0
    arr.map(point => {
      isBeyondZoneAUpper(point) && missed++
    })

    return missed
  }

  const checkRuleOneLower = arr => {
    let missed = 0
    arr.map(point => {
      isBeyondZoneALower(point) && missed++
    })

    return missed
  }

  const arr3 = createArrays(values, 3)
  return arr3.filter(arr => {
    return checkRuleOneUpper(arr) > 1 || checkRuleOneLower(arr) > 1
  })
}

checkRule2(data)
// e.o rule 2

// rule 4 - Nine consecutive points fall on the same side of the centerline (in zone C or beyond)
const center = 8

export function checkRule4 (values) {
  const arr9 = createArrays(values, 9)

  return arr9.filter(arr => {
    return arr.every(point => point > center) || arr.every(point => point < center)
  })
}

checkRule4(data)
// e.o rule 4
