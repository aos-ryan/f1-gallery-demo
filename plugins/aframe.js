import {
  portalCameraComponent,
  tapToPlacePortalComponent,
  spinComponent,
  promptFlowComponent,
} from '~/assets/js/portal.js'

import { loadingComponent } from '~/assets/js/loading'
import { uiControls } from '~/assets/js/uiControls'
import { rotateComponent } from '~/assets/js/rotate'
import { modelClick } from '~/assets/js/modelClick'
import { moveToMarker } from '~/assets/js/moveToMarker'
import { spotlight } from '~/assets/js/spotlight'
import fitComponent from '~/assets/js/fit'
import { points } from '~/assets/js/points'

AFRAME.registerComponent('portal-camera', portalCameraComponent)
AFRAME.registerComponent('prompt-flow', promptFlowComponent)
AFRAME.registerComponent('spin', spinComponent)
AFRAME.registerComponent('fit', fitComponent)
AFRAME.registerComponent('tap-to-place-portal', tapToPlacePortalComponent)

AFRAME.registerComponent('loading', loadingComponent)
AFRAME.registerComponent('ui-controls', uiControls)

AFRAME.registerComponent('rotate', rotateComponent)
AFRAME.registerComponent('model-click', modelClick)
AFRAME.registerComponent('move-to-marker', moveToMarker)
AFRAME.registerComponent('spotlight', spotlight)
AFRAME.registerComponent('points', points)
