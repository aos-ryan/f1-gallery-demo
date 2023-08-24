<template>
  <body>
    <canvas class="webgl"></canvas>
    <div class="point point-0">
      <div class="label">1</div>
      <div class="text">
        Hard tyres provide the least grip, but are supposed to remain in working
        order the longest.
      </div>
    </div>
    <div class="point point-1">
      <div class="label">2</div>
      <div class="text">18-inch low-profile wheels.</div>
    </div>
  </body>
</template>

<script>
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  data() {
    return {
      sizes: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    }
  },
  methods: {
    init() {
      const canvas = document.querySelector('canvas.webgl')
      const scene = new THREE.Scene()
      // floor
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshStandardMaterial({
          color: '#444444',
          metalness: 0,
          roughness: 0.5,
        })
      )
      floor.receiveShadow = true
      floor.rotation.x = -Math.PI * 0.5
      floor.position.y = -1
      scene.add(floor)

      // points
      const points = [
        {
          position: new THREE.Vector3(1.5, 1, 0),
          element: document.querySelector('.point-0'),
        },
        {
          position: new THREE.Vector3(0, 1, 0.8),
          element: document.querySelector('.point-1'),
        },
      ]

      // lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
      directionalLight.castShadow = true
      directionalLight.shadow.mapSize.set(1024, 1024)
      directionalLight.shadow.camera.far = 15
      directionalLight.shadow.camera.left = -7
      directionalLight.shadow.camera.top = 7
      directionalLight.shadow.camera.right = 7
      directionalLight.shadow.camera.bottom = -7
      directionalLight.position.set(5, 5, 5)
      scene.add(directionalLight)

      // model
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        '/models/single_tyre_fixed.glb',
        (glb) => {
          const f1Scene = glb.scene
          f1Scene.scale.set(4, 4, 4)
          f1Scene.position.y = 1
          scene.add(f1Scene)
        }
        //   (progress) => {
        //     console.log("progress");
        //     console.log(progress);
        //   },
        //   (error) => {
        //     console.log("error");
        //     console.log(error);
        //   }
      )

      // sizes
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      // camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      )
      camera.position.set(2, 2, 2)
      scene.add(camera)

      // Controls
      const controls = new OrbitControls(camera, canvas)
      controls.target.set(0, 0.75, 0)
      controls.enableDamping = true

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      })
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Animate
      const clock = new THREE.Clock()
      let previousTime = 0
      // Raycaster
      const raycaster = new THREE.Raycaster()

      // window resizer
      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        // Update controls
        controls.update()
        // Go through each point
        for (const point of points) {
          // clone the position of the point
          const screenPosition = point.position.clone()
          // get the 2D screen position of the 3D scene position of the point
          screenPosition.project(camera)
          // update raycaster to go from the camera to the point
          raycaster.setFromCamera(screenPosition, camera)
          // ensure point is tied correctly to its 3D position
          const translateX = screenPosition.x * sizes.width * 0.5
          const translateY = -screenPosition.y * sizes.height * 0.5
          point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
          // test raycaster against all the objects in the scene, "true" parameter enables recursive testing
          const intersects = raycaster.intersectObjects(scene.children, true)
          // check intersects array, if array is empty then the point should be visible
          if (intersects.length === 0) {
            point.element.classList.add('visible')
          } else {
            // intersection could be behind the point, calculate the distance to the point, then calculate the intersections distance and compare
            const intersectionDistance = intersects[0].distance
            const pointDistance = point.position.distanceTo(camera.position)

            // if the intersectionDistance is less than the point distance i.e. the point is further away from the camera, it should not be visible
            if (intersectionDistance < pointDistance) {
              point.element.classList.remove('visible')
            } else {
              point.element.classList.add('visible')
            }
          }
        }
        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
      }
      tick()
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}

.point {
  position: absolute;
  top: 50%;
  left: 50%;
}
.point .label {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  line-height: 40px;
  font-weight: 100;
  font-size: 14px;
  cursor: help;
  transform: scale(0, 0);
  transition: transform 0.3s;
}
.point.visible .label {
  transform: scale(1, 1);
}
.point .text {
  position: absolute;
  top: 30px;
  left: -120px;
  width: 200px;
  padding: 20px;
  border-radius: 4px;
  background: #00000077;
  border: 1px solid #ffffff77;
  color: #ffffff;
  line-height: 1.3em;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 100;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}
.point:hover .text {
  opacity: 1;
}
</style>
