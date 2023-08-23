<template>
  <a-entity :id="`pedestal-${this.id}`" :position="`${this.position}`">
    <!-- geometry="primitive: box; width: 3; height: 8; depth: 3" -->
    <!-- <a-entity
      class="bustMarker"
      position="0 4 0"
      rotation="0 90 0"
      scale="5 10 1"
      geometry="primitive: plane"
      material="transparent: true; opacity: 0"
    >
    </a-entity> -->
    <a-entity
      :id="`${this.id}`"
      class="bustMarker"
      :gltf-model="`${this.src}`"
      :rotation="`${this.rotation}`"
      :scale="`${this.scale}`"
      position="0 4 0"
      spotlight
      spin="speed: 5000"
      shadow="receive: false"
    >
      <a-entity id="poiGroup">
        <a-entity
          v-for="(point, index) in this.pointsOfInterest"
          :position="`${point.position}`"
          :key="index"
          class="cantap"
        >
          <div class="point">
            <div class="label">{{ index + 1 }}</div>
            <div class="text">{{ point.text }}</div>
          </div>
        </a-entity>
      </a-entity>
    </a-entity>
  </a-entity>
</template>
<script>
export default {
  props: {
    id: String,
    src: String,
    info: String,
    rotation: String,
    scale: String,
    zoomScale: String,
    position: String,
    pointsOfInterest: Array,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped>
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
</style>
