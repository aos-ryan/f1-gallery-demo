const uiControls = {
  init() {
    const uis = document.querySelectorAll('#ui')
    const recenterBtn = document.getElementById('recenter-btn')

    this.el.sceneEl.addEventListener('realityready', () => {
      // When reality is ready (scene loaded) display the UI controls
      uis.forEach((ui) => {
        ui.style.display = 'flex'
      })
    })
    // Repositions the camera to the origin / facing direction from updateCameraProjectionMatrix
    recenterBtn.addEventListener('click', (e) => {
      XR8.XrController.recenter()
    })
  },
}
export { uiControls }
