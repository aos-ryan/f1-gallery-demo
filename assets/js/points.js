const points = {
  // this component is added to the "points group" entity
  schema: {},
  init() {
    this.sizes = { width: window.innerWidth, height: window.innerHeight }
    this.scene = document.getElementById('scene')

    this.cameraRig = document.getElementById('camera').object3D
    this.camera = document.getElementById('camera').getObject3D('camera')
    this.raycaster = new THREE.Raycaster()
    this.points = [
      {
        position: new THREE.Vector3(14, 5, -45),
        element: document.querySelector('.point-0'),
      },
      {
        position: new THREE.Vector3(4, 3, -45),
        element: document.querySelector('.point-1'),
      },
    ]
    console.log()
  },
  tick() {
    // console.log(this.camera.position)
    // use a raycaster to make sure each html point element is updated to reflect the position of its point in the scene
    for (const point of this.points) {
      // get the world position of the point
      const screenPosition = point.position.clone()

      // get the 2D screen position of the 3D scene position of the point
      screenPosition.project(this.camera)

      // update raycaster to go from camera to the point
      this.raycaster.setFromCamera(screenPosition, this.camera)

      // ensure point is tied correctly to its 3D position
      const translateX = screenPosition.x * this.sizes.width * 0.5
      const translateY = -screenPosition.y * this.sizes.height * 0.5
      point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`

      const intersects = this.raycaster.intersectObject(
        document.getElementById('tyre').object3D,
        // this is the "bust" entity
        true
      )
      // console.log(intersects)

      if (intersects.length === 0) {
        point.element.classList.add('visible')
      } else {
        // intersection could be behind the point, calculate the distance to the point, then calculate the intersections distance and compare
        const intersectionDistance = intersects[0].distance
        const pointDistance = point.position.distanceTo(this.cameraRig.position)
        // console.log(pointDistance)
        // if the intersectionDistance is less than the point distance i.e. the point is further away from the camera, it should not be visible
        if (intersectionDistance < pointDistance) {
          point.element.classList.remove('visible')
        } else {
          point.element.classList.add('visible')
        }
      }
    }
  },
}
export { points }
