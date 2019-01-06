// Western Electric rules
// https://en.wikipedia.org/wiki/Western_Electric_rules

const data = [2,5,8,8,85,4,4,5,5,8,8,7]

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

console.log(createArrays(data, 4))

// rule 1 - Any single data point falls outside the 3σ-limit
export function checkRule1 (values) {
  return values.filter(x => (x > this.valueUCL || x < this.valueLCL))
}
// e.o rule 1

// rule 2 - Two out of three consecutive points fall beyond the 2σ-limit
export function checkRule2 (values) {
  return values.filter(x => (x > this.valueUCL || x < this.valueLCL))
}
// e.o rule 2
