const uiControls = {
  init() {
    const uis = document.querySelectorAll('#ui')
    const resetBtn = document.getElementById('reset-btn')
    const recenterBtn = document.getElementById('recenter-btn')
    const soundBtn = document.getElementById('sound-btn')
    const infoBtn = document.getElementById('info-btn')
    const modal = document.getElementById('info-modal')
    const closeBtn = document.getElementById('close-modal')
    const humSound = document.getElementById('positional-hum')
    let soundOn = true

    this.el.sceneEl.addEventListener('realityready', () => {
      // When reality is ready (scene loaded) display the UI controls
      uis.forEach((ui) => {
        ui.style.display = 'flex'
        soundBtn.classList.add('active')
      })
    })
    // Repositions the camera to the origin / facing direction from updateCameraProjectionMatrix
    recenterBtn.addEventListener('click', (e) => {
      recenterBtn.classList.add('ripple')
      XR8.XrController.recenter()
    })
    recenterBtn.addEventListener('animationend', (e) => {
      recenterBtn.classList.remove('ripple')
    })
    // handle clicking audio button
    soundBtn.addEventListener('click', (e) => {
      soundBtn.classList.add('ripple')
      soundOn = !soundOn
      if (!soundOn) {
        humSound.components.sound.stopSound()
        soundBtn.classList.remove('active')
      } else {
        humSound.components.sound.playSound()
        soundBtn.classList.add('active')
      }
    })
    soundBtn.addEventListener('animationend', (e) => {
      soundBtn.classList.remove('ripple')
    })
    // Reset the experience at any stage
    resetBtn.addEventListener('click', (e) => {
      resetBtn.classList.add('ripple')
      location.reload()
    })
    // infoBtn.addEventListener('click', (e) => {
    //   modal.style.display = 'block'
    //   infoBtn.classList.add('active')
    //   infoBtn.classList.add('ripple')
    // })

    // // Add event listener to close the modal
    // closeBtn.addEventListener('click', (e) => {
    //   infoBtn.classList.remove('active')
    //   infoBtn.classList.remove('ripple')
    //   modal.style.display = 'none'
    // })
  },
}
export { uiControls }
