const colliderCheck = {
  dependencies: ['raycaster'],

  init: function () {
    const tetra = this.el.sceneEl.querySelector('#tetra')
    // when the camera intersects (goes close to) the tetra, start the shrink animation
    this.el.addEventListener('raycaster-intersection', () => {
      tetra.setAttribute('animation__shrink', {
        property: 'scale',
        to: {
          x: 0,
          y: 0,
          z: 0,
        },
        dur: 1000,
        easing: 'linear',
      })
      //  when the shrink animation is complete, remove the sound, create the explosion entity
      tetra.addEventListener('animationcomplete__shrink', () => {
        const humSound = document.getElementById('positional-hum')
        humSound.components.sound.stopSound()

        const explosion = document.createElement('a-entity')
        // add an event listener to the entity that waits for the object3D to be set by the explosion component, and then ensure the mesh isn't culled
        explosion.addEventListener('object3dset', () => {
          const model = explosion.getObject3D('mesh')
          model.traverse((node) => {
            if (node.isMesh) {
              node.frustumCulled = false
            }
          })
        })
        // set the attributes of the explosion entity
        explosion.setAttribute('explode', true)
        explosion.setAttribute('position', { x: 0, y: 6, z: -7 })
        explosion.setAttribute('animation__scaleup', {
          property: 'scale',
          dur: 500,
          from: '0.001 0.001 0.001',
          to: '1 1 1',
          easing: 'linear',
        })
        // add the explosion entity to the DOM
        const portalContents = document.getElementById('portal-contents')
        portalContents.appendChild(explosion)
      })
    })
  },
}
export { colliderCheck }
