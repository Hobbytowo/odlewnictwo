<template lang="html">
  <div class="form">
    <div class="row">
      <div class="data">
        <label class="label" for="numberOfData">Number of data in one point:</label>
        <input v-model="numberOfData" class="input" type="number" min="0" id="numberOfData">
      </div>

      <div class="data">
        <label class="label" for="NumberOfPoints">Number of points to create chart:</label>
        <input v-model="NumberOfPoints" class="input" type="number" min="0" id="NumberOfPoints">
      </div>
    </div>
    <button @click="createChart" class="button" type="button" name="button">
      Create chart
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      numberOfData: 6,
      NumberOfPoints: 8
    }
  },
  methods: {
    createChart () {
      this.$emit('createChart', this.numberOfData, this.NumberOfPoints)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form {
    margin-bottom: 40px;
  }

  .row {
    display: flex;
    justify-content: space-around;
  }

  .data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .label {
    margin-bottom: 15px;
  }

  .input {
    width: 50px;
    background-color: #fff99b;
    padding: 7px;
    border: 2px solid black;
    border-radius: 5px;
    margin-left: 10px;
  }

  .button {
    border-radius: 15px;
    border: 2px solid #fff;
    padding: 10px 15px;
    display: block;
    margin: auto;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    background-color: #003a2e;
    color: #fff;

    cursor: pointer;
    transition: all 0.3s;
    will-change: background-color;

    &:hover {
      background-color: #00163a;
    }
  }
</style>
