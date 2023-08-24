const spotlight = {
  schema: {
    enabled: { default: true },
  },
  init: function () {
    this.model = this.el
    this.parent = this.el.parentNode
    // const raycastMarker = this.parent.querySelector('.bustMarker')
    // console.log(raycastMarker)

    // create the spotlight and point it at the entity
    const spotlight = document.createElement('a-light')
    spotlight.setAttribute('id', `${this.model.id}-spotlight`)
    spotlight.setAttribute('type', 'spot')
    spotlight.setAttribute('target', `#${this.model.id}`)
    spotlight.setAttribute('light', 'castShadow: true')
    spotlight.setAttribute('angle', '30')
    spotlight.setAttribute('intensity', '0')
    spotlight.setAttribute('position', '0 18 0')
    spotlight.setAttribute(`animation__${this.model.id}lightup`, {
      property: 'intensity',
      to: '1',
      dur: 500,
      startEvents: 'raycasterIntersectingTarget',
    })
    spotlight.setAttribute(`animation__${this.model.id}lightoff`, {
      property: 'intensity',
      to: '0',
      dur: 500,
      startEvents: 'raycasterLeftIntersectingTarget',
    })
    // add spotlight to the scene
    this.parent.appendChild(spotlight)

    // add an event listeners to the bust element that looks for a raycaster intersection and turns on/offm spotlight
    this.model.addEventListener('raycaster-intersected', () => {
      spotlight.emit('raycasterIntersectingTarget', null, false)
    })
    this.model.addEventListener('raycaster-intersected-cleared', () => {
      spotlight.emit('raycasterLeftIntersectingTarget', null, false)
    })
  },
  remove: function () {
    const spotlight = document.querySelector(`#${this.model.id}-spotlight`)
    spotlight.remove()
  },
}
export { spotlight }
