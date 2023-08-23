import vertexShader from '~/static/shaders/explode.vert'
import fragmentShader from '~/static/shaders/explode.frag'

const explosion = {
  init: function () {
    const el = this.el
    const vector = new THREE.Vector4()

    const instances = 50000

    const positions = []
    const offsets = []
    // array of colours that is cycled through on each iteration of the for loop
    const brandColors = [
      [1.0, 0.94, 0.16, 1.0],
      [0.0, 0.0, 0.0, 1.0],
      [0.93, 0.93, 0.93, 1.0],
      [1.0, 1.0, 1.0, 1.0],
    ]
    const colors = []
    let colorSetCounter = 0

    const orientationsStart = []
    const orientationsEnd = []
    // position of the vertices for each shape created by instance buffer geometry, these stay the same each instance
    positions.push(0, 0, 0)
    positions.push(0.25, 0, 0)
    positions.push(0.125, 0.2165, 0)

    for (let i = 0; i < instances; i++) {
      // offsets

      offsets.push(Math.random() * 3, Math.random() * 3, Math.random() * 3)

      // colors
      const colorSet = brandColors[colorSetCounter]
      colors.push(...colorSet)
      colorSetCounter = (colorSetCounter + 1) % brandColors.length

      // orientation start

      vector.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      )
      vector.normalize()

      orientationsStart.push(vector.x, vector.y, vector.z, vector.w)

      // orientation end

      vector.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      )
      vector.normalize()

      orientationsEnd.push(vector.x, vector.y, vector.z, vector.w)
    }

    const geometry = new THREE.InstancedBufferGeometry()
    geometry.instanceCount = instances // set so its initalized for dat.GUI, will be set in first draw otherwise

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    )

    geometry.setAttribute(
      'offset',
      new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3)
    )
    geometry.setAttribute(
      'color',
      new THREE.InstancedBufferAttribute(new Float32Array(colors), 4)
    )
    geometry.setAttribute(
      'orientationStart',
      new THREE.InstancedBufferAttribute(new Float32Array(orientationsStart), 4)
    )
    geometry.setAttribute(
      'orientationEnd',
      new THREE.InstancedBufferAttribute(new Float32Array(orientationsEnd), 4)
    )

    const material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      forceSinglePass: true,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    el.setObject3D('mesh', mesh)
  },

  tick: function () {
    const time = performance.now()

    const object = this.el.getObject3D('mesh')

    object.rotation.y = time * 0.0005
    object.material.uniforms['time'].value = time * 0.005
    object.material.uniforms['sineTime'].value = Math.sin(
      object.material.uniforms['time'].value * 0.05
    )
  },
}
export { explosion }
