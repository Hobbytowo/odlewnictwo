<template>
  <div class="container">
    <header class="header">
      <h1 class="app-title">
        Statistical Process Control
      </h1>

      <button
        class="button button--settings"
        title="Settings"
        @click="showSettings = true"
      >
        <settings-img/>
      </button>
    </header>

    <form-csv/>
    <chart/>

    <settings-modal
      v-if="showSettings"
      @close="showSettings = false"
    />
  </div>
</template>

<script>
import formCsv from '@/components/form-csv'
import chart from '@/components/chart'
import SettingsImg from "./components/images/settings";
import SettingsModal from "./components/settings";

export default {
  name: 'app',
  components: {
    SettingsImg,
    SettingsModal,
    formCsv,
    chart
  },
  data() {
   return {
     showSettings: false
    }
  },
}
</script>

<style lang="scss">
  body {
    background-color: #4A4E69;
    color: #F2E9E4;
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
    font-weight: 400;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      height: 2px;
      width: 100%;
      background: #F2E9E4;
    }
  }

  .button {
    background: transparent;
    border: none;
    outline: none;
  }
</style>
