const points = {
  // this component is added to the "points group" entity
  schema: {},
  init() {
    this.sizes = { width: window.innerWidth, height: window.innerHeight }
    this.scene = document.getElementById('scene')
    this.children = this.el.childNodes
    this.camera = document.getElementById('camera').object3D
    this.raycaster = new THREE.Raycaster()

    console.log(this.el.object3D.parent)
  },
  tick() {
    // children is a list of a-entities, one for each point of interest for each model
    // each a-entity has a child div which is the html point element, which in turn has a two children (label and text)
    // use a raycaster to make sure each html point element is updated to reflect the position of its parent a-entity
    for (const entity of this.children) {
      const htmlPoint = entity.querySelector('.point')

      // get the world position of the point
      let screenPosition = new THREE.Vector3()
      entity.object3D.getWorldPosition(screenPosition)

      // get the 2D screen position of the 3D scene position of the point
      screenPosition.project(this.camera.children[2])

      // update raycaster to go from camera to the point
      this.raycaster.setFromCamera(screenPosition, this.camera.children[2])

      // ensure point is tied correctly to its 3D position
      const translateX = screenPosition.x * this.sizes.width * 0.5
      const translateY = -screenPosition.y * this.sizes.height * 0.5
      htmlPoint.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`

      const intersects = this.raycaster.intersectObject(
        this.el.object3D.parent,
        // this is the "bust" entity children array
        true
      )

      if (intersects.length === 0) {
        htmlPoint.classList.add('visible')
      } else {
        // intersection could be behind the point, calculate the distance to the point, then calculate the intersections distance and compare
        const intersectionDistance = intersects[0].distance
        const pointDistance = entity.object3D.position.distanceTo(
          this.camera.position
        )
        // if the intersectionDistance is less than the point distance i.e. the point is further away from the camera, it should not be visible
        if (intersectionDistance < pointDistance) {
          htmlPoint.classList.remove('visible')
        } else {
          htmlPoint.classList.add('visible')
        }
      }
    }
  },
}
export { points }
