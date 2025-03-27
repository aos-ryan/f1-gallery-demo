const materialControl = {
  schema: {
    roughness: { type: 'number', default: 0.5 },
    metalness: { type: 'number', default: 0.5 },
  },

  init: function () {
    const el = this.el
    const data = this.data

    this.model = null

    el.addEventListener('model-loaded', (event) => {
      this.model = event.detail.model
      this.updateMaterials()
    })
  },

  updateMaterials: function () {
    if (!this.model) return
    this.model.traverse((node) => {
      if (node.isMesh && node.material) {
        if (Array.isArray(node.material)) {
          node.material.forEach((mat) => this.applyMaterialChanges(mat))
        } else {
          this.applyMaterialChanges(node.material)
        }
      }
    })
  },

  applyMaterialChanges: function (material) {
    material.roughness = this.data.roughness
    material.metalness = this.data.metalness
    material.transparent = this.data.opacity < 1.0
    material.needsUpdate = true
  },

  update: function () {
    this.updateMaterials()
  },
}
export { materialControl }
