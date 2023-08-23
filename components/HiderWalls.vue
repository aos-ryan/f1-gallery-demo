<template>
  <xrextras-opaque-background remove="true">
    <a-entity id="hider-walls">
      <a-box
        scale="100 1 100"
        position="0 -1 49"
        xrextras-hider-material
      ></a-box>
      <a-box
        scale="100 100 1"
        position="0 50 75"
        xrextras-hider-material
      ></a-box>
      <a-box
        scale="100 1 100"
        position="0 100 49"
        xrextras-hider-material
      ></a-box>
      <a-box
        scale="1 100 100"
        position="-30 50 50"
        xrextras-hider-material
      ></a-box>
      <a-box
        scale="1 100 100"
        position="30 50 50"
        xrextras-hider-material
      ></a-box>
      <a-ring
        id="portalHiderRing"
        radius-inner="0.001"
        radius-outer="100"
        position="0 7.5 -0.2"
        xrextras-hider-material
      ></a-ring>

      <a-entity id="hider-spinner" position="0 7.5 -0.2">
        <a-box
          id="newPortalHiderOne"
          scale="30 5 0"
          position="0 -6.320 0"
          xrextras-hider-material
        >
        </a-box>
        <a-box
          id="newPortalHiderTwo"
          scale="30 5 0"
          position="5.379 1.729 0"
          rotation="0 0 -60"
          xrextras-hider-material
        >
        </a-box>
        <a-box
          id="newPortalHiderThree"
          scale="30 5 0"
          position="-5.529 1.381 0"
          rotation="0 0 60"
          xrextras-hider-material
        >
        </a-box>
      </a-entity>
    </a-entity>

    <a-entity id="portal-wall">
      <a-entity
        geometry="primitive: triangle"
        rotation="0 180 0"
        position="0 8.517 0"
        scale="11.44 9.69 0"
        xrextras-hider-material
      ></a-entity>
      <a-entity
        geometry="primitive: triangle"
        rotation="0 180 0"
        position="0 8.517 0.25"
        scale="11.44 9.69 0"
        xrextras-hider-material
      ></a-entity>
    </a-entity>
  </xrextras-opaque-background>
</template>
<script>
export default {}
</script>
<style></style>
