export default function downloadCSV () {
  const blob = new Blob(['stockData\nsvv'], {type: 'text/csv'})
  const a = window.document.createElement("a")

  a.href = window.URL.createObjectURL(blob)
  a.download = 'filename.csv'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
