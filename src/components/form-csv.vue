<template lang="html">
  <input type="file" @change="updateData($event)">
</template>

<script>
export default {
  methods: {
    updateData(e) {
      if (window.FileReader) {
        const reader = new FileReader()
        reader.readAsText(e.target.files[0])

        reader.onload = event => {
          const csv = event.target.result
          console.log(csv)
        }
        reader.onerror = event => {
          if (evt.target.error.name === "NotReadableError") {
            alert("Canno't read file !")
          }
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
