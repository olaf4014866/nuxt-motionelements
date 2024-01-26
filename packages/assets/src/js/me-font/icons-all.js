import { library } from '@fortawesome/fontawesome-svg-core';
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome';

import {
  fab,
} from '@fortawesome/free-brands-svg-icons';
import {
  fal,
} from '@fortawesome/pro-light-svg-icons';
import {
  far,
} from '@fortawesome/pro-regular-svg-icons';
import {
  fas,
} from '@fortawesome/pro-solid-svg-icons';
import {
  fad,
} from '@fortawesome/pro-duotone-svg-icons';
import {
  falMe,
} from '@motionelements/assets/src/js/me-font/icons/me-font-icons-light.js';
import {
  farMe,
} from '@motionelements/assets/src/js/me-font/icons/me-font-icons-regular.js';
import {
  fasMe,
} from '@motionelements/assets/src/js/me-font/icons/me-font-icons-solid.js';
import {
  fadMe,
} from '@motionelements/assets/src/js/me-font/icons/me-font-icons-duotone.js';

library.add(
  fab, fal, far, fas, fad,
  falMe, farMe, fasMe, fadMe,
);

export default function install(Vue) {
  Vue.component('font-awesome-icon', FontAwesomeIcon);
  Vue.component('font-awesome-layers', FontAwesomeLayers);
  Vue.component('font-awesome-layers-text', FontAwesomeLayersText);
}
