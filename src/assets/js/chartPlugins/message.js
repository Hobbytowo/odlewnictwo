// https://github.com/apertureless/vue-chartjs/issues/130

export default function showMessage (that, message) {
  return that.addPlugin({
    id: message,

    beforeDraw(chart) {
      const width = chart.chart.width
      const height = chart.chart.height
      const ctx = chart.chart.ctx

      const fontSize = (width / 340).toFixed(2)
      const text = message
      const textX = Math.round((width - ctx.measureText(text).width) / 4)
      const textY = height / 2.3

      ctx.restore()
      ctx.font = `${fontSize}em sans-serif`
      ctx.textBaseline = 'middle'
      ctx.fillText(text, textX, textY)
      ctx.save()
    }
  })
}
