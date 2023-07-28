import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderPhotos } from './thumbnails.js';
import { openModal } from './open-photo.js';
import { hideModalForm } from './form.js';

try {
  const data = await getData();
  renderPhotos(data);
  openModal(data);
  hideModalForm();
} catch (err) {
  showAlert(err.message);
}
