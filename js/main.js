import { getPhotos } from './data.js';
import { openModal } from './open-photo.js';
import './form.js';
import { setEffectsSlider } from './effects.js';

openModal(getPhotos());
setEffectsSlider();
