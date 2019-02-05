<template lang="html">
  <transition name="modal">
     <div class="modal-mask">
       <div class="modal-wrapper">
         <div class="modal-container">

           <div class="modal-header header">
             <h3 class="title">Settings</h3>
           </div>

           <div class="modal-body body">
              default body
           </div>

           <div class="modal-footer footer">
             <button class="modal-button button" @click="$emit('close')">
               OK
             </button>
           </div>
         </div>
       </div>
     </div>
   </transition>
</template>

<script>
export default {
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    close () {
      this.showModal = false
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
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}

.modal-container {
  width: 60vw;
  margin: 15vh auto 0;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.title {
  margin: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.button {
  background-color: #333;
  color: #ddd;
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 7px;
  cursor: pointer;

  transition: color 0.2s;
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
