<template>
  <div id="loading-modal">
    <div id="loading-modal-content">
      <video
        id="intro-video"
        muted
        autoplay
        playsinline
        crossorigin="anonymous"
        loop="true"
        src="/textures/loading.mp4"
      ></video>
      <div id="start" class="button">
        Now loading an Array of Stars Experience
      </div>
    </div>
    <div id="disclaimer">
      This prototype demonstrates augmented reality functionality and
      potential.<br />It is not related to client work.
    </div>
  </div>
</template>
<script></script>
<style scoped>
#loading-modal {
  z-index: 998;
  height: 100%;
  background-color: #000000;
  position: relative;
}
#loading-modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25%;
}
#start {
  font-family: 'Plain';
  pointer-events: none;
}
#disclaimer {
  font-family: 'Plain';
  user-select: none;
  color: white;
  font-size: 10px;
  padding: 5% 20%;
  text-align: center;
  position: absolute;
  bottom: 5%;
}
#intro-video {
  width: 100vw;
}

.button {
  height: auto;
  text-align: center;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 14px;
  color: #e6e6e6;
  user-select: none;
}
.button.shimmer {
  color: grey;
  display: inline-block;
  -webkit-mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300%
    100%;
  mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300% 100%;
  background-repeat: no-repeat;
  animation: shimmer 2.5s infinite;
}
</style>
