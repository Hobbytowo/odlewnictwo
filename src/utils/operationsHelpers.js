import _ from 'lodash'

export function round (nr, space) {
  return Math.round(nr * (10 ** space)) / (10 ** space)
}

export function countMean (points) {
  return _.mean(points)
}

export function countDeviation (points, centerValue) {
  const powers = points.map(point => {
    return (point - centerValue) ** 2
  })

  return Math.sqrt(_.sum(powers) / points.length)
}
