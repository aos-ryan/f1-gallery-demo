<template>
  <div id="ar-div" class="cantap">
    <!-- UI -->
    <div id="overlay" class="absolute-fill">
      <span id="promptText"></span>
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
      stats
    >
      <!-- stats -->
      <!-- Assets -->
      <a-assets>
        <img id="brick" src="/textures/brickwall.jpg" />
      </a-assets>

      <!-- Camera -->
      <a-camera id="camera" position="0 9 9" portal-camera>
        <a-entity
          id="light-raycaster"
          raycaster="objects: .bustMarker; far: 25"
        >
        </a-entity>
        <a-entity
          id="objects-raycaster"
          cursor="fuse: false; rayOrigin: mouse;"
          raycaster="objects: .cantap"
        ></a-entity>

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
      <a-entity id="portal-contents">
        <a-entity
          id="room"
          geometry="primitive: box"
          material="src: #brick; side: back"
          scale="50 50 50"
          position="-0.177 25.25 -25.22"
        >
        </a-entity>
        <!-- Busts / Models in scene -->
        <Models
          v-for="model in modelData"
          :key="model.id"
          :id="model.id"
          :src="model.src"
          :info="model.info"
          :rotation="model.rotation"
          :scale="model.scale"
          :zoomScale="model.zoomScale"
          :position="model.position"
          :pointsOfInterest="model.markers"
        >
        </Models>
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
      currentModelId: '',
      modelData: [
        // {
        //   id: 'zeus',
        //   src: '/models/zeus_bust.glb',
        //   info: 'Zeus is the sky and thunder god in ancient Greek religion, who rules asking of the gods on Mount Olympus.',
        //   rotation: '0 -180 0',
        //   scale: '1 1 1',
        //   zoomScale: '0.5 0.5 0.5',
        //   position: '-22 1 -10',
        // },
        {
          id: 'lady',
          src: '/models/lady_bust.glb',
          info: 'The bust portrays a lady of the Spanish high society of 1909.',
          rotation: '0 90 0',
          scale: '5 5 5',
          zoomScale: '0.5 0.5 0.5',
          position: '-22 1 -10',
          markers: [
            {
              position: '0.1 0.1 0.2',
              text: 'This is a text marker',
            },
            {
              position: '0.1 0.2 0.2',
              text: 'This is a second text marker',
            },
          ],
        },
        {
          id: 'lady2',
          src: '/models/lady_bust.glb',
          info: 'This is a duplicate of the bust portraying a lady of the Spanish high society of 1909.',
          rotation: '0 90 0',
          scale: '5 5 5',
          zoomScale: '0.5 0.5 0.5',
          position: '-22 1 -20',
          markers: [
            // {
            //   position: '0.1 0.1 0.2',
            //   text: 'This is a text marker',
            // },
            // {
            //   position: '0.1 0.2 0.2',
            //   text: 'This is a second text marker',
            // },
          ],
        },
      ],
    }
  },
  methods: {
    doBgFade() {
      this.bgFade = !this.bgFade
    },
    handleModelChange(event) {
      // update the current model id
      this.currentModelId = event.target.getAttribute('id')
    },
  },
  created() {
    document.addEventListener('bg-fade', this.doBgFade)
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
