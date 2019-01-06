// Western Electric rules
// https://en.wikipedia.org/wiki/Western_Electric_rules

// rule 1 - Any single data point falls outside the 3σ-limit
export function checkRule1 (values) {
  return values.filter(x => (x > this.valueUCL || x < this.valueLCL))
}
// e.o rule 1
