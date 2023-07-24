import { renderPhotos } from './thumbnails.js';
import { showModalPhoto } from './photo-modal.js';

// Родительский элемент для фото
const container = document.querySelector('.pictures');

// Открытие модального окна
const openModal = (pictures) => {
  container.addEventListener('click', (evt) => {
    const photo = evt.target.closest('[data-photo-id]');
    if (!photo) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find((item) => item.photoId === +photo.dataset.photoId);
    showModalPhoto(picture);
  });
  renderPhotos(pictures, container);
};

export { openModal };
