import { getPhotos } from './data.js';
import { openModal } from './open-photo.js';
import './form.js';

openModal(getPhotos());
