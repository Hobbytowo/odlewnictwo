// Western Electric rules
// https://en.wikipedia.org/wiki/Western_Electric_rules

const data = [2,5,8,8,85, 10,4,4,5,5,8,8,7]

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
    return checkRuleOneUpper(arr) < 2 && checkRuleOneLower(arr) < 2
  })
}

console.log(checkRule2(data))
// e.o rule 2
