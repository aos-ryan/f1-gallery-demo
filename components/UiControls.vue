<template>
  <div id="ui">
    <div id="reset-btn" class="bdr-ripple">
      <img class="ui-img" src="/textures/reset.png" />
    </div>
    <div id="recenter-btn" class="bdr-ripple">
      <img class="ui-img" src="/textures/recenter.png" />
    </div>
    <div id="info-btn" class="bdr-ripple">
      <img class="ui-img" src="/textures/info.png" />
    </div>
    <div id="sound-btn" class="bdr-ripple">
      <img class="ui-img" src="/textures/audio.png" />
    </div>
  </div>
</template>
<script></script>
<style scoped>
#ui {
  display: none;
  position: absolute;
  z-index: 5;
  left: 7vh;
  bottom: 5vh;
  width: 70%;
  flex-direction: row;
  justify-content: space-between;
  pointer-events: auto;
}

.ui-img {
  width: 30px;
  height: 30px;
}

/* Button Ripple */
.bdr-ripple {
  display: block;
  background: #ffffff00;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 100%;
  box-sizing: border-box;
  color: #666;
  overflow: hidden;
}
.bdr-ripple.active {
  background: #fff;
}
.ripple {
  animation: at-ripple 0.6s linear 1;
}
@keyframes at-ripple {
  0% {
    box-shadow: 0 4px 10px rgba(234, 234, 234, 0.1),
      0 0 0 0 rgba(234, 234, 234, 0.1), 0 0 0 5px rgba(234, 234, 234, 0.1),
      0 0 0 10px rgba(234, 234, 234, 0.1);
  }
  100% {
    box-shadow: 0 4px 10px rgba(234, 234, 234, 0.1),
      0 0 0 5px rgba(234, 234, 234, 0.1), 0 0 0 10px rgba(234, 234, 234, 0.1),
      0 0 0 20px rgba(234, 234, 234, 0);
  }
}

@keyframes shimmer {
  100% {
    mask-position: left;
    -webkit-mask-position: left;
  }
}
</style>
