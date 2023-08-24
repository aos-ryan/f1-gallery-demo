const moveToMarker = {
  schema: {
    modelSrc: { type: 'string' },
    zoomScale: { type: 'string' },
    defaultRotation: { type: 'string', default: '0 0 0' },
  },
  init() {
    this.bust = this.el
    this.camera = document.querySelector('#camera')
    this.pedestal = this.el.parentNode
    this.bustZoomed = false

    const secondClickEvent = (e) => {
      // turn off the info modal
      document.dispatchEvent(new Event('bg-fade'))
      // let the logic know the bust is not zoomed
      this.bustZoomed = false
      this.bust.removeAttribute('rotate')
      // reattach bust to pedestal
      this.pedestal.object3D.attach(this.bust.object3D)
      // add spotlight back
      this.bust.setAttribute('spotlight', '')
      // return bust to the pedestal
      this.bust.setAttribute('position', '0 7 0')
      this.bust.setAttribute('rotation', this.data.defaultRotation)

      // re add the first click event so it can be run again
      this.bust.addEventListener('click', firstClickEvent)
      // remove event listener
      this.bust.removeEventListener('click', secondClickEvent)
    }

    const firstClickEvent = (e) => {
      document.dispatchEvent(new Event('bg-fade'))
      this.bust.emit('currentModelChanged')
      this.bustZoomed = true
      // where is bust when clicked
      // console.log('local position:', this.bust.object3D.position)
      // console.log(
      //   'world position:',
      //   this.bust.object3D.getWorldPosition(new THREE.Vector3())
      // )
      // remove bust from its parent (pedestal entity) and attach to the scene element
      this.bust.sceneEl.object3D.attach(this.bust.object3D)

      // disable spotlight
      this.bust.removeAttribute('spotlight')
      this.bust.setAttribute('rotate', '')

      // remove the event after the first time the model is clicked
      this.bust.removeEventListener('click', firstClickEvent)
      // add the second click event which handles placing the modal back on the pedestal
      this.bust.addEventListener('click', secondClickEvent)
    }

    // when the bust is clicked, run the first place event
    this.bust.addEventListener('click', firstClickEvent)
  },
  tick() {
    const distanceFromCamera = 4
    const target = new THREE.Vector3(0, 1, -distanceFromCamera)
    target.applyMatrix4(this.camera.object3D.matrixWorld)
    // const distance = this.bust.object3D
    //   .getWorldPosition(new THREE.Vector3())
    //   .distanceTo(target)
    const distance = Math.round(this.bust.object3D.position.distanceTo(target))
    // console.log(distance)
    if (this.bustZoomed && distance > 0) {
      // lerp bust to target
      this.bust.object3D.lookAt(target)
      this.bust.object3D.position.lerp(target, 0.1)
      // console.log(distance)
      if (distance == 1) {
        this.camera.object3D.attach(this.bust.object3D)
        this.bustZoomed = false
      }
    }
  },
}
export { moveToMarker }
