<template lang="html">
  <div class="buttons">
    <button
      class="button button--select"
      type="button"
      @click="selectFile"
      v-text="this.path ? 'File selected' : 'Select file'"
    />

    <button
      :class="{ 'button--disable': (!path && !watcher) || (path && watcher) }"
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
    data() {
      return {
        watcher: null,
        path: '',
        showSettings: false
      }
    },
    computed: {
      brokenRules() {
        return this.$store.state.brokenRules
      }
    },
    methods: {
      selectFile() {
        const {dialog} = require('electron').remote

        dialog.showOpenDialog({properties: ['openFile']}, path => {
          path
            ? this.path = path[0]
            : console.log("No file selected")
        })
      },
      startWatching() {
        if ((!this.path && !this.watcher) || (this.path && this.watcher)) return

        fs.writeFile(this.path, '', err => { // initial clearing data
          if (err) { // error
            alert('Please, close your csv file and try again.')
            console.error("An error ocurred clearing the file " + err.message)
          } else { // succeed cleared data
            this.$store.commit('updateData', [])

            this.watcher = chokidar.watch(this.path, {
              ignored: /[/\\]\./,
              persistent: true
            })

            this.watcher
              .on('change', () => {
                this.onChange()
              })
              .on('error', error => {
                console.error('Error happened', error)
              })
          }
        })
      },
      onChange() {
        fs.readFile(this.path, (err, fileData) => {
          if (!fileData) {
            console.error(err)
            setTimeout(() => {
              this.onChange()
            }, 500)
          } else if (err) { // different error
            console.error(err)
          } {
            const parsedData = this.parseCSV(fileData)
            parsedData.pop()
            this.$store.commit('updateData', parsedData)
          }
        })
      },
      parseCSV(csv) {
        return csv.toString().split('\n')
          .map(data => data.replace('\r', ''))
          .map(data => data.replace(',', '.'))
          .map(data => data.replace(/"/g, '') * 1)
      },
      stopProcess() {
        if (this.watcher !== null) {
          this.watcher.close()
          this.watcher = null

          setTimeout(() => {
            alert(`Broken rules: ${[...this.brokenRules]}.`)
            this.$store.commit('updateRulesStatus', [])
          }, 800)
        }
      },
      openSettings() {
        this.showSettings = true
      }
    },
    watch: {
      brokenRules() {
        this.brokenRules.length && this.stopProcess()
      },
      path() {
        if (this.watcher !== null) {
          this.watcher.close()
          this.watcher = null
        }

        this.$store.commit('updateRulesStatus', [])
        this.$store.commit('updateData', [])
      }
    }
  }
</script>

<style lang="scss" scoped>
  .buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 600px;
    margin: 0 auto;
  }

  .button {
    height: 55px;
    border-radius: 30px;
    border: 1px solid white;
    cursor: pointer;
    padding: 8px 25px;
    margin: 15px;

    background-color: #000;
    color: white;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.4px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    outline: none;
    transition: all 0.3s;

    &:hover {
      background-color: #051818;
    }

    &--start {
      width: 160px;
      height: 65px;
      border-radius: 30px;
      font-size: 14px;
      line-height: 20px;
      border: 2px solid #c3b000;
      color: #c3b000;

      &:hover {
        background-color: #222;
        border: 2px solid orange;
        color: orange;
      }
    }

    &--settings {
      order: 1;
    }

    &--disable {
      pointer-events: none;
    }
  }
</style>
