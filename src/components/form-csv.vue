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
      watcher: null,
      path: ''
    }
  },
  methods: {
    startWatcher (path) {
      this.watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./,
        persistent: true
      })

      this.watcher
      .on('add', path => {
        this.path = path
        const data = fs.readFileSync(path)
        this.data = this.parseCSV(data)
        this.$emit('onUpdateDate', this.data)
      })
      .on('change', path => {
        const data = fs.readFileSync(this.path)
        this.data = this.parseCSV(data)
        this.$emit('onUpdateDate', this.data)
      })
      .on('error', error => {
        console.error('Error happened', error)
      })
    },
    startWatching () {
      const { dialog } = require('electron').remote
      const vm = this

      dialog.showOpenDialog({
        properties: ['openFile']
      }, path => {
        path
          ? vm.startWatcher(path[0])
          : console.log("No file selected")
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
    },
    parseCSV (csv) {
      return csv.toString().split('\n')
        .map(data => data.replace('\r', ''))
        .filter(data => data)
        .map(data => data.replace(',', '.') * 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
