<template lang="html">
  <transition name="modal">
     <div class="modal-mask">
       <div class="modal-wrapper">
         <form class="modal-container">

           <div class="modal-header header">
             <h3 class="title title--main">Settings</h3>
           </div>

           <div class="modal-body body">
             <!-- window width -->
             <div class="setting-wrapper">
               <div class="setting">
                  <label for="window" class="label label--window">Window width:</label>
                  <input
                    ref="windowInput"
                    type="number"
                    class="input input--window"
                    min="1"
                    :value="$store.state.windowWidth"
                    required
                  >
               </div>
             </div>
             <!--e/o window width -->

             <!-- rules settings -->
             <div class="setting-wrapper">
               <p class="title title--rules">
                 Rules to execute
               </p>

               <div
                 v-for="rule in $store.state.rules"
                 :key="rule.idx"
                 class="rules rules-wrapper"
               >
                 <div class="setting">
                   <input
                     type="checkbox"
                     :id="`rule${rule.idx}`"
                     :checked="rule.checked"
                     class="checkbox"
                   >

                   <label :for="`rule${rule.idx}`" class="label" v-text="rule.name"/>

                   <Tooltip :description="rule.description"/>
                 </div>
               </div>
             </div>
             <!-- rules settings -->
           </div>

           <div class="modal-footer footer">
             <button class="modal-button button" @click.prevent="submitForm">
               OK
             </button>
           </div>
         </form>
       </div>
     </div>
   </transition>
</template>

<script>
import Tooltip from './tooltip'

export default {
  components: {
    Tooltip
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    submitForm () {
      this.$emit('close')
      this.showModal = false

      this.$store.commit('updateWindowWidth', this.$refs.windowInput.value)
      // this.$store.commit('updateSelectedRules', parsedData)
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .7);
  transition: opacity .3s ease;
}

.modal-container {
  min-width: 300px;
  max-width: 70vw;
  padding: 20px 30px;
  background-color: #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.title {
  margin: 20px 0;
  color: #42b983;
  font-weight: 700;

  &--main {
    margin-top: 0;
  }
}

.modal-body {
  margin: 20px 0;
}

.setting {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.label {
  font-size: 14px;
  color: #222;
  cursor: pointer;
  margin: 0 10px;

  &--window {
    margin-left: 0;
  }
}

.input {
  width: 50px;
  padding: 4px;
  border-radius: 5px;
}

.checkbox {
  cursor: pointer;
}

.button {
  background-color: #333;
  color: #ddd;
  border: 1px solid #ddd;
  padding: 8px 15px;
  border-radius: 7px;

  display: block;
  margin-left: auto;

  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #42b983;
  }
}


// modal animation
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
// e/o modal animation
</style>
