<template>
  <a-entity
    :id="`pedestal-${this.id}`"
    :position="`${this.position}`"
    geometry="primitive: box; width: 3; height: 8; depth: 3"
    material="color: #7d7d7d"
  >
    <!--  -->
    <a-entity
      class="bustMarker"
      position="0 4 0"
      rotation="0 90 0"
      scale="5 10 1"
      geometry="primitive: plane"
      material="transparent: true; opacity: 0"
    >
    </a-entity>
    <a-entity
      :id="`${this.id}`"
      class="bustMarker"
      :gltf-model="`${this.src}`"
      :rotation="`${this.rotation}`"
      :scale="`${this.scale}`"
      position="0 7 0"
      spotlight
      shadow="receive: false"
    >
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
<style scoped></style>
