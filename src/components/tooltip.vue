<template lang="html">
  <div class="info">
    <span class="info__span span" v-text="'?'"/>
    <div class="tooltip-wrapper">
      <div class="tooltip" v-text="description"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .info {
    background-color: #ff6;
    color: black;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 10px;

    position: relative;

    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover, &:hover .tooltip-wrapper {
      opacity: 1;
    }
  }

  .span {
    font-size: 10px;
    font-weight: 700;
    display: block;
    text-align: center;
    margin-top: 4px;
    cursor: help;
  }

  .tooltip-wrapper {
    position: absolute;
    top: 0;
    left: 30px;

    padding: 10px;
    min-width: 250px;
    max-width: 500px;
    border-radius: 4px;
    background-color: #42b983;

    pointer-events: none;
    transition: opacity 0.2s;
    opacity: 0;
  }

  .tooltip {
    font-size: 13px;
    line-height: 20px;
  }
</style>
