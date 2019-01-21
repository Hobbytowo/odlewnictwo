<template lang="html">
  <div class="">
    <input type="file" @change="updateData($event)">
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: ''
    }
  },
  methods: {
    updateData(e) {
      const reader = new FileReader()
      reader.readAsText(e.target.files[0])

      reader.onload = event => {
        const csv = event.target.result
        const dataArray = this.parseCSV(csv)
        console.log(dataArray)
      }

      reader.onerror = event => {
        if (evt.target.error.name === "NotReadableError") {
          alert("Canno't read file")
        }
      }
    },
    parseCSV (csv) {
      return csv.split('\n')
        .map(data => data.replace('\r', ''))
        .filter(data => data)
        .map(data => data.replace(',', '.') * 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
