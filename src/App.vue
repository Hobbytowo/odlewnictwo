<template>
  <div class="container">
    <header class="header">
      <h1 class="app-title">
        Aplikacja do obliczeń układu wlewowego
      </h1>

      <button
        class="button button--settings"
        title="Settings"
        @click="showSettings = true"
      >
        <settings-img/>
      </button>
    </header>

    <settings-modal
      v-if="showSettings"
      @close="showSettings = false"
    />
  </div>
</template>

<script>
import SettingsImg from "./components/icons/settings";
import SettingsModal from "./components/settings";

export default {
  name: 'app',
  components: {
    SettingsImg,
    SettingsModal,
  },
  data() {
   return {
     showSettings: false,
     isFileWatching: false
    }
  },
}
</script>

<style lang="scss">
  body {
    background-color: antiquewhite;
    color: #333;
    font-family: 'Lato', sans-serif;
  }

  .container {
    padding: 10px 50px 50px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .app-title {
    font-size: 16px;
    font-weight: bold;
  }

  .button {
    background: transparent;
    border: none;
    outline: none;
  }
</style>
