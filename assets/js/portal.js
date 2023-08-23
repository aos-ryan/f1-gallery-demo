const portalCameraComponent = {
  schema: {
    width: { default: 10 },
    height: { default: 10 },
  },
  init() {
    // find camera, contents, and portal elements
    this.camera = this.el
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')
    this.isInPortalSpace = false
    this.wasOutside = true
    this.lightsOn = false
    this.toggleLights = false

    // create logic for the ambient light in the scene
    this.ambientLight = document.createElement('a-light')
    this.ambientLight.setAttribute('id', 'ambient-scene-light')
    this.ambientLight.setAttribute('type', 'ambient')
    this.ambientLight.setAttribute('color', '#CCC')
    this.ambientLight.setAttribute('intensity', '0.05')
    this.ambientLight.setAttribute('animation__ambientlightson', {
      property: 'intensity',
      to: '0.2',
      dur: 500,
      startEvents: 'turnOnAmbientLight',
    })
    this.ambientLight.setAttribute('animation__ambientlightsoff', {
      property: 'intensity',
      to: '0.05',
      dur: 500,
      startEvents: 'turnOffAmbientLight',
    })
    // add ambientLight to the scene
    this.camera.sceneEl.appendChild(this.ambientLight)
    // document.querySelector('a-scene').addEventListener('loaded', () => {
    //   console.log(this.ambientLight.components.light.light.intensity)
    // })
  },
  tick() {
    const { position } = this.camera.object3D
    const isOutside = position.z > 0
    const withinPortalBounds =
      position.y < this.data.height &&
      Math.abs(position.x) < this.data.width / 2
    if (this.wasOutside !== isOutside && withinPortalBounds) {
      this.isInPortalSpace = !isOutside
    }
    this.contents.object3D.visible = this.isInPortalSpace || isOutside
    this.walls.object3D.visible = !this.isInPortalSpace && isOutside
    this.portalWall.object3D.visible = this.isInPortalSpace && !isOutside
    this.wasOutside = isOutside

    // toggle ambient lights when in portal
    if (!isOutside) {
      this.toggleLights = true
      if (this.toggleLights && !this.lightsOn) {
        console.log('turn on lights')
        this.ambientLight.emit('turnOnAmbientLight')
        this.toggleLights = false
        this.lightsOn = true
      }
    }
    if (isOutside && this.lightsOn) {
      this.ambientLight.emit('turnOffAmbientLight')
      console.log('turn off lights')
      this.lightsOn = false
    }
  },
}
const tapToPlacePortalComponent = {
  init() {
    const { sceneEl } = this.el
    this.camera = document.getElementById('camera')
    this.contents = document.getElementById('portal-contents')
    this.walls = document.getElementById('hider-walls')
    this.portalWall = document.getElementById('portal-wall')

    this.isInPortalSpace = false
    this.wasOutside = true
    const portalHiderRing = this.el.sceneEl.querySelector('#portalHiderRing')
    const portalRim = this.el.sceneEl.querySelector('#portalRim')

    const firstPlaceEvent = (e) => {
      sceneEl.emit('recenter')
      sceneEl.emit('dismissPrompt')

      portalHiderRing.setAttribute('animation__1', {
        property: 'radius-inner',
        dur: 400,
        from: '0.001',
        to: '6.9',
        easing: 'linear',
      })
      portalRim.setAttribute('animation__2', {
        property: 'scale',
        dur: 500,
        from: '0.001 0.001 0.001',
        to: '2 2 2',
        easing: 'linear',
      })
      sceneEl.removeEventListener('click', firstPlaceEvent)
    }
    sceneEl.addEventListener('click', firstPlaceEvent)
  },
}
const promptFlowComponent = {
  init() {
    this.prompt = document.getElementById('promptText')
    this.overlay = document.getElementById('overlay')
    this.el.sceneEl.addEventListener('realityready', () => {
      this.overlay.style.display = 'block'
      this.prompt.innerHTML = 'Tap to Place<br>Portal'
      this.prompt.classList.add('fly-in')
    })
    this.el.addEventListener('dismissPrompt', () => {
      this.prompt.classList.remove('fly-in')
      this.prompt.classList.add('fly-out')
    })
  },
}
const spinComponent = {
  schema: {
    speed: { default: 2000 },
    direction: { default: 'normal' },
    axis: { default: 'y' },
    dual: { default: false },
  },
  init() {
    const { el } = this
    el.setAttribute('animation__spin', {
      property: `object3D.rotation.${this.data.axis}`,
      from: 0,
      to: 360,
      dur: this.data.speed,
      dir: this.data.direction,
      loop: true,
      easing: 'linear',
    })
    if (this.data.dual) {
      el.setAttribute('animation__spinx', {
        property: `object3D.rotation.x`,
        from: 0,
        to: 360,
        dur: this.data.speed,
        dir: this.data.direction,
        loop: true,
        easing: 'linear',
      })
    }
  },
}
export {
  portalCameraComponent,
  tapToPlacePortalComponent,
  promptFlowComponent,
  spinComponent,
}
