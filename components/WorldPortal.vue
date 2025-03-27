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
      <div class="point point-0" @click="togglePoiExpand">
        <div class="label">1</div>
        <div class="text">
          Hard tyres provide the least grip but have longevity.
        </div>
      </div>
      <div class="point point-1" @click="togglePoiExpand">
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
      points
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
          material-control
          bounding-box
        >
        </a-entity>
        <a-light
          id="spot-light"
          type="spot"
          target="#car"
          light="castShadow: true; shadowMapHeight: 2048; shadowMapWidth: 2048a;"
          position="21.5 21 -8"
          intensity="1.5"
          penumbra="0.9"
          angle="30"
        >
        </a-light>

        <!-- <a-entity light="type: ambient; color: #CCC"></a-entity> -->
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
      isExpanded: false,
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
    togglePoiExpand(event) {
      const gsap = this.$gsap
      const target = event.target.closest('.point')
      const textElement = target.querySelector('.text')

      if (!target) return

      if (this.activeElement === target) return

      if (this.activeTimeline) {
        this.activeTimeline.reverse()
      }

      this.activeTimeline = gsap.timeline()
      this.activeTimeline.to(target, {
        width: '250px',
        duration: 0.3,
        ease: 'power1.inOut',
      })
      this.activeTimeline.to(textElement, {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.inOut',
      })

      this.activeElement = target

      document.addEventListener('click', this.handleOutsideClick)
    },
    handleOutsideClick(event) {
      if (this.activeElement && !this.activeElement.contains(event.target)) {
        this.activeTimeline.reverse()
        this.activeElement = null
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },
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
  mounted() {
    // document.addEventListener('click', (event) => {
    //   const points = document.querySelectorAll('.point, .text')
    //   // Check if a .point element was clicked
    //   let pointClicked = event.target.closest('.point')
    //   if (pointClicked) {
    //     // Show the clicked one
    //     let textElement = pointClicked.querySelector('.text')
    //     if (textElement) {
    //       textElement.classList.add('visible')
    //     }
    //     pointClicked.classList.add('expanded')
    //   } else {
    //     console.log(points)
    //     // Clicked outside, hide all .text elements
    //     points.forEach((point) => point.classList.remove('expanded'))
    //     points.forEach((text) => text.classList.remove('visible'))
    //   }
    // })
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
.points-container {
  user-select: none;
}
.point {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 999;
  opacity: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.7);
  /* overflow: hidden; */
  transition: width 0.3s ease-in-out;
  width: 50px;
  height: 50px;
}

.point.visible {
  opacity: 1;
}
.point.expanded {
  width: 250px;
}
.point .label {
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50%;
  font-family: 'KHInterference';
}
.point .text {
  opacity: 0;
  overflow: hidden;
  color: white;
  font-size: 12px;
  font-family: 'KHInterference';
  padding-left: 60px;
  padding-right: 10px;
  transition: opacity 0.2s ease-in-out 0.3s;
}

.point .text.visible {
  opacity: 1;
}

/* Red corner brackets */
.point::before,
.point::after {
  z-index: 999;
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid red;
}

.point::before {
  top: -10px;
  left: -10px;
  border-right: none;
  border-bottom: none;
}

.point::after {
  bottom: -10px;
  right: -10px;
  border-left: none;
  border-top: none;
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
