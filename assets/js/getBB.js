const boundingBox = {
  schema: {
    debug: { type: 'boolean', default: true }, // Show bounding box
  },

  init: function () {
    this.el.addEventListener('model-loaded', (event) => {
      const model = event.detail.model

      // Compute bounding box
      const bbox = new THREE.Box3().setFromObject(model)
      const size = new THREE.Vector3()
      bbox.getSize(size)
      const center = new THREE.Vector3()
      bbox.getCenter(center)

      if (this.data.debug) {
        this.createBoundingBoxEntity(size, center)
      }
    })
  },

  createBoundingBoxEntity: function (size, center) {
    const bboxEl = document.createElement('a-entity')
    bboxEl.setAttribute('geometry', {
      primitive: 'box',
      width: size.x,
      height: size.y,
      depth: size.z,
    })
    bboxEl.setAttribute('position', `${center.x} ${center.y} ${center.z}`)
    bboxEl.setAttribute('material', {
      color: 'none',
      transparent: true,
      opacity: 0,
    })
    bboxEl.setAttribute('id', 'raycast-target')

    this.el.sceneEl.appendChild(bboxEl)
  },
}
export { boundingBox }
