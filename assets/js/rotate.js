const rotateComponent = {
  schema: {
    factor: { default: 0.01 },
    friction: { default: 0.98 },
  },
  init: function () {
    this.handleEvent = this.handleEvent.bind(this)
    this.el.sceneEl.addEventListener('touchstart', this.handleEvent, false)
    this.el.sceneEl.addEventListener('touchmove', this.handleEvent, false)
    this.el.sceneEl.addEventListener('touchend', this.handleEvent, false)
    this.startPoint = new THREE.Vector2()
    this.currentPoint = new THREE.Vector2()
    this.previousPoint = new THREE.Vector2()
    this.velocity = new THREE.Vector2()
    this.rotation = new THREE.Vector3()
    this.isRotating = false
    this.animationId = null
  },
  remove: function () {
    this.el.sceneEl.removeEventListener('touchstart', this.handleEvent)
    this.el.sceneEl.removeEventListener('touchmove', this.handleEvent)
    this.el.sceneEl.removeEventListener('touchend', this.handleEvent)
  },
  handleEvent: function (event) {
    switch (event.type) {
      case 'touchstart':
        this.onTouchStart(event)
        break
      case 'touchmove':
        this.onTouchMove(event)
        break
      case 'touchend':
        this.onTouchEnd(event)
        break
    }
  },
  onTouchStart: function (event) {
    if (event.touches.length === 1) {
      this.startPoint.x = event.touches[0].pageX
      this.startPoint.y = event.touches[0].pageY
      this.previousPoint.copy(this.startPoint)
      this.isRotating = true
      cancelAnimationFrame(this.animationId)
    }
  },
  onTouchMove: function (event) {
    if (event.touches.length === 1) {
      this.currentPoint.x = event.touches[0].pageX
      this.currentPoint.y = event.touches[0].pageY
      if (this.isRotating) {
        this.rotateMesh()
      } else {
        this.startPoint.copy(this.currentPoint)
        this.previousPoint.copy(this.currentPoint)
        this.isRotating = true
        cancelAnimationFrame(this.animationId)
      }
    }
  },
  onTouchEnd: function (event) {
    if (event.touches.length === 0) {
      this.isRotating = false
    }
  },
  rotateMesh: function () {
    this.velocity.subVectors(this.currentPoint, this.previousPoint)
    this.rotation.y += this.velocity.x * this.data.factor
    this.el.object3D.rotation.y = this.rotation.y
    this.previousPoint.copy(this.currentPoint)
  },
}
export { rotateComponent }
