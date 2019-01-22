export default function clearData () {
  const blob = new Blob([''], {type: 'text/csv'})
  const a = window.document.createElement("a")

  a.href = window.URL.createObjectURL(blob)
  a.download = 'data.csv'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
