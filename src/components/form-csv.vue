<template lang="html">
  <div class="">
    <button
      ref="start"
      type="button"
      @click="startWatching"
      v-text="'Select folder to watch'"
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

      function onWatcherReady() {
        console.log('From here can you check for real changes, the initial scan has been completed.')
      }

      this.watcher
      .on('add', function (path) {
        console.log('File', path, 'has been added')
      })
      .on('addDir', function (path) {
         console.log('Directory', path, 'has been added')
       })
      .on('change', function (path) {
        console.log('File', path, 'has been changed')
      })
      .on('unlink', function (path) {
        console.log('File', path, 'has been removed')
      })
      .on('unlinkDir', function (path) {
        console.log('Directory', path, 'has been removed')
      })
      .on('error', function (error) {
        console.log('Error happened', error)
      })
      .on('ready', onWatcherReady)
      .on('raw', function(event, path, details) {
        // This event should be triggered everytime something happens.
        console.log('Raw event info:', event, path, details)
      })
    },
    startWatching () {
      const { dialog } = require('electron').remote
      const vm = this

      dialog.showOpenDialog({
        properties: ['openDirectory']
      }, function (path) {
        if (path) {
          vm.startWatcher(path[0])
        } else {
          console.log("No path selected")
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
  },
  watch: {
    data () {
      console.log('data changed')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
