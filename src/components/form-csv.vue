<template lang="html">
  <div class="buttons">
    <button
      class="button button--select"
      type="button"
      @click="selectFile"
      v-text="'Select file'"
    />

    <button
      class="button button--start"
      type="button"
      @click="startWatching"
      v-text="'Start watching'"
    />

    <button
      class="button button--stop"
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
    selectFile () {
      const { dialog } = require('electron').remote

      dialog.showOpenDialog({
        properties: ['openFile']
      }, path => {
        path
          ? this.path = path[0]
          : console.log("No file selected")
      })
    },
    startWatching () {
      this.watcher = chokidar.watch(this.path, {
        ignored: /[\/\\]\./,
        persistent: true
      })

      // initial data
      const fileData = fs.readFileSync(this.path)
      this.data = this.parseCSV(fileData)
      this.$emit('onUpdateDate', this.data)
      console.log(this.path, 'watchiiing')
      // e/o initial data

      this.watcher
      .on('change', () => {
        const fileData = fs.readFileSync(this.path)
        this.data = this.parseCSV(fileData)
        this.$emit('onUpdateDate', this.data)
      })
      .on('error', error => {
        console.error('Error happened', error)
      })
    },
    stopWatching () {
      if (!this.watcher) {
        console.log("You need to start first the watcher")
      } else {
        this.watcher.close()
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
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;

    padding: 0 50px;
  }

  .button {
    width: 160px;
    height: 70px;
    border-radius: 35px;
    border: 3px solid white;
    cursor: pointer;
    padding: 10px;
    margin: 15px 0;

    background-color: #222;
    color: white;
    font-size: 21px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    outline: none;
    transition: all 0.3s;

    &:hover {
      background-color: #555;
    }
  }
</style>
