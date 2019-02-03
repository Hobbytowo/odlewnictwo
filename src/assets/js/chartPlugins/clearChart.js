export default function clearChart (that) {
  return that.addPlugin({
    beforeDraw(chart) {
      const width = chart.chart.width
      const height = chart.chart.height
      const ctx = chart.chart.ctx

      ctx.clearRect(0, 0, width, height);
    }
  })
}
