<template>
  <div id="ar-div">
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <div id="ui">
        <div id="recenter-btn" class="bdr-ripple">
          <img class="ui-img" src="/textures/recenter.png" />
        </div>
      </div>
      <span id="promptText"></span>
    </div>
    <!-- Points -->
    <div class="points-container" v-show="inPortal">
      <div class="point point-0">
        <div class="label">1</div>
        <div class="text">
          Hard tyres provide the least grip, but are supposed to remain in
          working order the longest.
        </div>
      </div>
      <div class="point point-1">
        <div class="label">2</div>
        <div class="text">18-inch low-profile wheels.</div>
      </div>
    </div>
    <!-- Info Modal -->
    <InfoModal
      v-if="bgFade"
      :modelData="modelData"
      :currentModelId="currentModelId"
      @modelChange="handleModelChange"
    />

    <!-- Scene -->
    <a-scene
      id="scene"
      light="defaultLightsEnabled: false"
      xrweb="allowedDevices: any; disableDefaultEnvironment: false; disableWorldTracking:false"
      xrextras-runtime-error
      renderer="colorManagement: true;"
      tap-to-place-portal
      prompt-flow
      ui-controls
      stats
    >
      <!-- points -->
      <!-- stats -->
      <!-- Assets -->
      <a-assets>
        <img id="concrete" src="/textures/Concrete/Concrete_basecolor.jpg" />
        <img id="concreteNormal" src="/textures/Concrete/Concrete_normal.jpg" />
        <img id="concreteRough" src="/textures/Concrete/Concrete_rough.jpg" />
      </a-assets>

      <!-- Camera -->
      <a-camera id="camera" position="0 9 9" portal-camera>
        <!-- <a-entity
          id="light-raycaster"
          raycaster="objects: .bustMarker; far: 60"
        >
        </a-entity> -->
        <!-- <a-entity
          id="objects-raycaster"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="objects: .cantap"
        ></a-entity> -->

        <!-- Plane that blocks the scene -->
        <!-- <a-plane
          v-if="bgFade"
          height="1"
          width="1"
          position="0 0 -3"
          material="shader: flat; transparent: true; opacity: 1"
          fit
          ></a-plane> -->
      </a-camera>

      <!-- Hider walls -->
      <HiderWalls />
      <!-- Portal Contents -->
      <a-entity id="portal-contents" position="0 -2 0">
        <a-entity
          id="room"
          geometry="primitive: box"
          material="color: #000000; roughness: 0; metalness: 0; side: double "
          position="0 0.15 0"
          rotation="0 90 0"
          scale="250 250 250"
          shadow="cast: false"
        >
        </a-entity>
        <a-plane
          id="floor"
          material="repeat: 20 20; src: #concrete; normalMap: #concreteNormal; roughnessMap: #concreteRough; roughness: 0.5; metalness: 0.5;"
          scale="1 1 1"
          width="150"
          height="150"
          position="0 2.3 -15"
          rotation="-90 0 0"
          shadow="receive: true"
        >
        </a-plane>
        <a-plane
          id="infiniteFloor"
          material="color: #000000; roughness: 0; metalness: 0;"
          scale="1000 1000 1000"
          position="0 2.1 -15"
          rotation="-90 0 0"
        >
        </a-plane>

        <a-entity
          id="car"
          class="bustMarker"
          gltf-model="/models/RB18-v1.glb"
          rotation="0 0 0"
          scale="5 5 5"
          position="2 2.2 -15"
          shadow="receive: false"
        >
        </a-entity>
        <a-light
          id="spot-light"
          type="spot"
          target="#car"
          light="castShadow: true; shadowMapHeight: 2048; shadowMapWidth: 2048;"
          position="21.5 21 -8"
          intensity="1.5"
          penumbra="0.9"
          angle="30"
        >
        </a-light>
      </a-entity>

      <!-- Portal -->
      <a-entity
        id="portalRim"
        gltf-model="/models/portal.glb"
        position="0 7 11.65"
        rotation="0 0 0"
        scale="0.001 0.001 0.001"
      >
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
import InfoModal from './InfoModal.vue'
import HiderWalls from './HiderWalls.vue'
import Models from './Models.vue'

export default {
  components: {
    InfoModal,
    HiderWalls,
    Models,
  },
  data() {
    return {
      bgFade: false,
      inPortal: false,
      currentModelId: '',
      modelData: [
        {
          id: 'tyre',
          src: '/models/rc-13.glb',
          info: 'A formula one car.',
          rotation: '0 -90 0',
          scale: '2 2 2',
          zoomScale: '0.5 0.5 0.5',
          position: '0 1 -25',
        },
      ],
    }
  },
  methods: {
    doBgFade() {
      this.bgFade = !this.bgFade
    },
    toggleInPortal() {
      this.inPortal = !this.inPortal
    },
    handleModelChange(event) {
      // update the current model id
      this.currentModelId = event.target.getAttribute('id')
    },
  },
  created() {
    document.addEventListener('bg-fade', this.doBgFade)
    document.addEventListener('toggleInPortal', this.toggleInPortal)
    document.addEventListener('currentModelChanged', this.handleModelChange)
  },
}
</script>

<style scoped>
#ar-div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#bg-fade {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 6;
  background-color: white;
  opacity: 0.8;
}

.absolute-fill {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}
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

#promptText {
  font-family: 'Plain';
  font-size: 14px;
  text-align: center;
  color: white;

  position: absolute;
  width: 100%;
  bottom: 12vh;
  left: 50%;
  transform: translate(-50%, 0);
}
/* Styles for points of interest */
.point {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
}
.point .label {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  line-height: 40px;
  font-weight: 100;
  font-size: 14px;
  cursor: help;
  transform: scale(0, 0);
  transition: transform 0.3s;
}
.point.visible .label {
  transform: scale(1, 1);
}
.point .text {
  position: absolute;
  top: 30px;
  left: -120px;
  width: 200px;
  padding: 20px;
  border-radius: 4px;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  line-height: 1.3em;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.point:hover .text {
  opacity: 1;
}

/* Animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fly-in {
  animation: fly-in 1.5s ease-out both;
}
@keyframes fly-in {
  0% {
    transform: translate(-100%, 0%);
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
}
.fly-out {
  animation: fly-out 1.5s ease-out both;
}
@keyframes fly-out {
  0% {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translate(0%, 0%);
    opacity: 0;
  }
}
</style>
