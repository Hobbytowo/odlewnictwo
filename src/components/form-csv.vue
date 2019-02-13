<template lang="html">
  <div class="buttons">
    <button
       class="button button--select"
       type="button"
       @click="selectFile"
       v-text="this.path ? 'File selected' : 'Select file'"
    />

    <button
      :class="{ 'button--disable': !path || watcher }"
      class="button button--start"
      type="button"
      @click="startWatching"
      v-text="(watcher && this.path) ? 'Watching...' : 'Start watching'"
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
  computed: {
    brokenRules () {
      return this.$store.state.brokenRules
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
        ignored: /[/\\]\./,
        persistent: true
      })

      this.initProcess()

      this.watcher
      .on('change', () => {
        this.startProcess()
      })
      .on('error', error => {
        console.error('Error happened', error)
      })
    },
    initProcess () {
      // this.clearCSVFile() todo

      this.$store.commit('updateRulesStatus', [])

      this.$nextTick(() => {
        this.startProcess()
      })
    },
    startProcess () {
      fs.readFile(this.path, (err, fileData) => {
        const parsedData = this.parseCSV(fileData)
        this.$store.commit('updateData', parsedData)
      })
    },
    parseCSV (csv) {
      return csv.toString().split('\n')
        .map(data => data.replace('\r', ''))
        .filter(data => data)
        .map(data => data.replace(',', '.') * 1)
    },
    stopProcess () {
      if (this.watcher !== null) this.watcher.close()
      this.watcher = null

      alert(`Broken rules: ${[...this.brokenRules]}.`)
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
  },
  watch: {
    brokenRules () {
      this.brokenRules.length && this.stopProcess()
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
    height: 60px;
    border-radius: 30px;
    border: 2px solid white;
    cursor: pointer;
    padding: 10px 20px;
    margin: 15px;

    background-color: #222;
    color: white;
    font-size: 17px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    outline: none;
    transition: all 0.3s;

    &:hover {
      background-color: #555;
    }

    &--start {
      width: 160px;
      height: 70px;
      border-radius: 35px;
      font-size: 19px;
      line-height: 25px;
      border: 3px solid white;
    }

    &--settings {
      order: 1;
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
