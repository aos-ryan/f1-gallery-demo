<template>
  <div id="info-modal">
    <!-- <div id="close-modal" class="close" @click="handleClose">&times;</div> -->
    <div class="modal-body">
      {{ modelData[currentModelIndex].info }}
      <!-- <div id="controls">
        <button id="nav-right" @click.prevent="handleClick">Next</button>
      </div> -->
      <p class="instructions">Tap bust again to replace on the pedestal</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    modelData: Array,
    currentModelId: String,
  },
  data() {
    return {}
  },
  computed: {
    currentModelIndex() {
      return this.modelData.findIndex((x) => x.id === `${this.currentModelId}`)
    },
  },
  methods: {
    handleClick() {
      this.$emit('modelChange')
    },
    handleClose() {
      // toggle bg fade
      document.dispatchEvent(new Event('bg-fade'))
    },
  },
}
</script>
<style scoped>
#info-modal {
  z-index: 999;
  background-color: #000000;
  position: absolute;
  width: 100%;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0% 5%;
  border-radius: 5px;
  pointer-events: auto;
}
#controls {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5vh 5vw;
  user-select: none;
  font-family: 'Plain';
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}
.instructions {
  user-select: none;
  font-style: italic;
  font-size: 12px;
}
.close {
  position: absolute;
  top: 8px;
  right: 7%;
  font-size: 34px;
  color: #ffffff;
}
</style>
