// import { getPhotos } from './data.js';
import { getData, sendData } from './api.js';
import { showAlert } from './util.js';
import { renderPhotos } from './thumbnails.js';
import { openModal } from './open-photo.js';
import { setOnFormSubmit, hideModalForm, unblockSubmitButton } from './form.js';
import { showSuccessMessage, showErrorMessage } from './form-message.js';

try {
  const data = await getData();
  renderPhotos(data);
  openModal(data);
  setOnFormSubmit();
  hideModalForm();
} catch (err) {
  showAlert(err.message);
}

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModalForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
});
