<template lang="html">
  <div class="buttons">
    <button
      class="button button--select"
      type="button"
      @click="selectFile"
      v-text="this.path ? 'Change path' : 'Select file'"
    />

    <button
      :class="{ 'button--disable': !path }"
      class="button button--start"
      type="button"
      @click="startWatching"
      v-text="watcher ? 'Stop watching' : 'Start watching'"
    />

    <button
      class="button button--settings"
      type="button"
      @click="openSettings"
      v-text="'Settings'"
    />

    <modal v-if="showSettings" @close="showSettings = false"/>
  </div>
</template>

<script>
import Modal from './settings'
import chokidar from 'chokidar'
import fs from 'fs'

export default {
  components: {
    Modal
  },
  data () {
    return {
      watcher: null,
      path: '',
      showSettings: false
    }
  },
  methods: {
    selectFile () {
      const { dialog } = require('electron').remote

      dialog.showOpenDialog({ properties: ['openFile']}, path => {
        path
          ? this.path = path[0]
          : console.log("No file selected")
      })
    },
    startWatching () {
      if(!this.path) return

      this.watcher = chokidar.watch(this.path, {
        ignored: /[\/\\]\./,
        persistent: true
      })

      // initial data
      const fileData = fs.readFileSync(this.path)
      const parsedData = this.parseCSV(fileData)
      this.$store.commit('updateData', parsedData)
      // e/o initial data

      this.watcher
      .on('change', () => {
        const fileData = fs.readFileSync(this.path)
        const parsedData = this.parseCSV(fileData)
        this.$store.commit('updateData', parsedData)
      })
      .on('error', error => {
        console.error('Error happened', error)
      })
    },
    parseCSV (csv) {
      return csv.toString().split('\n')
        .map(data => data.replace('\r', ''))
        .filter(data => data)
        .map(data => data.replace(',', '.') * 1)
    },
    clearData () {
      this.watcher.close()
      this.watcher = null
      this.clearCSVFIle()
    },
    clearCSVFile () {
      fs.writeFile(this.path, '', err => {
        if (err) {
          alert("An error ocurred creating the file "+ err.message)
        }
      })
    },
    openSettings () {
      this.showSettings = true
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
    font-size: 19px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    outline: none;
    transition: all 0.3s;

    &:hover {
      background-color: #555;
    }

    &--disable {
      opacity: 0.5;
      cursor: context-menu;

      &:hover {
        opacity: 0.5;
        background-color: #222;
      }
    }
  }
</style>
