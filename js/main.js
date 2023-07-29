import { getData } from './api.js';
import { showAlert } from './util.js';
import { renderPhotos } from './thumbnails.js';
import { openModal } from './open-photo.js';
import { hideModalForm } from './form.js';
import { showFilters, setDebouncedFilter } from './thumbnails-filter.js';
import { setPreviewPictureListener } from './upload-photo.js';

try {
  const data = await getData();
  showFilters();
  openModal(data);
  setPreviewPictureListener();
  hideModalForm();
  renderPhotos(data);
  setDebouncedFilter(data);
} catch (err) {
  showAlert(err.message);
}
