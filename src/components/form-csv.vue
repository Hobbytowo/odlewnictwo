<template lang="html">
  <div class="">
    <button
      ref="start"
      type="button"
      @click="startWatching"
      v-text="'Select file'"
    />

    <button
      ref="stop"
      type="button"
      @click="stopWatching"
      v-text="'Stop watching'"
    />
  </div>
</template>

<script>
import chokidar from 'chokidar'
import fs from 'fs'

export default {
  data () {
    return {
      data: [],
      watcher: null
    }
  },
  methods: {
    updateData(e) {
      const reader = new FileReader()
      reader.readAsText(e.target.files[0])

      reader.onload = event => {
        const csv = event.target.result
        this.data = this.parseCSV(csv)
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
    },
    startWatcher (path) {
      this.watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./,
        persistent: true
      })

      this.watcher
      .on('add', path => {
        console.log('File', path, 'has been added')
      })
      .on('change', path => {
        console.log('File', path, 'has been changed')
      })
      .on('error', error => {
        console.error('Error happened', error)
      })
      .on('ready', () => {
        console.log('The initial scan has been completed.'
      )})
    },
    startWatching () {
      const { dialog } = require('electron').remote
      const vm = this

      dialog.showOpenDialog({
        properties: ['openFile']
      }, path => {
        if (path) {
          vm.startWatcher(path[0])
        } else {
          console.log("No file selected")
        }
      })
    },
    stopWatching () {
      if (!this.watcher) {
        console.log("You need to start first the watcher")
      } else {
        this.watcher.close()
        this.$refs.start.disabled = false
        console.log("Nothing is being watched")
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
