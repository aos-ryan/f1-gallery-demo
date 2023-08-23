const modelClick = {
  dependencies: ['raycaster'],
  schema: {
    modelSrc: { type: 'string', default: '/models/zeus_bust.glb' },
    zoomScale: { type: 'string' },
    rotation: { type: 'string', default: '0 0 0' },
  },

  init: function () {
    const bust = this.el
    // when the bust is clicked, transition to zoom in view
    bust.addEventListener('click', () => {
      console.log('entity is clicked')
      // fade the bg
      document.dispatchEvent(new Event('bg-fade'))

      // add the model as a child of the camera w/ rotate ability
      const camera = this.el.sceneEl.querySelector('#camera')
      const zoomBust = document.createElement('a-entity')
      zoomBust.id = 'zoomBust'
      zoomBust.setAttribute('class', 'cantap')
      zoomBust.setAttribute('gltf-model', `${this.data.modelSrc}`)
      zoomBust.setAttribute('scale', `${this.data.zoomScale}`)
      zoomBust.setAttribute('rotation', `${this.data.rotation}`)
      zoomBust.setAttribute('rotate', '')
      zoomBust.setAttribute('position', '0 -0.1 -0.4')
      // zoomBust.setAttribute(
      //   'animation',
      //   'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear'
      // )

      camera.appendChild(zoomBust)
    })
  },
}
export { modelClick }
