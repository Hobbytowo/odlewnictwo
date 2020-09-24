<template lang="html">
  <div class="buttons">
    <div class="button-wrapper button-wrapper--select">
      <button
        class="button button--select"
        :title="path ? 'Change file' : 'Select file'"
        @click="selectFile"
      >
        <file-add-img/>
      </button>

      <div class="selected-file">
        <span class="span" v-if="path || watcher">
         Selected file: <span class="span--file">{{ path }}</span>
        </span>
      </div>
    </div>

    <div v-if="path || watcher" class="button-wrapper">
      <button
        ref="watchButton"
        :class="{ 'button--watching': watcher }"
        class="button button--start"
        @click="!watcher ? startWatching() : stopWatching()"
      >
        <watch-img v-if="!watcher"/>
        <stop-watch-img v-if="watcher"/>

        <span
          class="span"
          v-text="watcher != null ? 'Stop watching' : 'Start watching'"
        />
      </button>
    </div>
  </div>
</template>

<script>
  import chokidar from 'chokidar'
  import fs from 'fs'
  import FileAddImg from "./images/file-add";
  import WatchImg from "./images/watch";
  import StopWatchImg from "./images/watch-stop";

  export default {
      components: {StopWatchImg, WatchImg, FileAddImg},
      data() {
      return {
        watcher: null,
        path: '',
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
        this.$refs.watchButton.blur()

        fs.writeFile(this.path, '', err => { // initial clearing data
          if (err) { // error
            alert('When app is starting to watch selected file, file has to be close.\nClose selected file, if it is open, and try again.')
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
      stopWatching () {
        this.$refs.watchButton.blur()
        this.watcher.close()
        this.watcher = null
        this.$store.commit('updateData', [])
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
    flex-direction: column;
    align-items: flex-start;
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    &--select {
      margin-bottom: 10px;
    }
  }

  .button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    transition: color .25s;
    color: #F2E9E4;

    display: flex;
    align-items: center;

    &--start {
      &:hover, &:focus {
        color: #c6b7b1;
      }
      &:hover /deep/ svg, &:focus /deep/ svg {
        fill: #c6b7b1;
      }
    }
    &--watching {
      color: #d8c99b;
      & /deep/ svg {
        fill: #d8c99b;
      }
    }
  }

  .span {
    font-size: 14px;
    font-weight: 300;
    margin: 0 5px;

    &--file {
      font-style: italic;
    }
  }

  .selected-file {
    display: flex;
    align-items: center;
  }
</style>
