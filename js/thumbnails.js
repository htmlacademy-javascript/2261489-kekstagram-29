// Шаблон фото
const photoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

// Контейнер для сгенерированных фото
const container = document.querySelector('.pictures');

// Отдельный элемент- фото
const createPhoto = ({ url, description, likes, comments, photoId }) => {
  const photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.dataset.photoId = photoId;

  return photo;
};

// Отрисовка на странице всех миниатюр
const renderPhotos = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const photo = createPhoto(picture);
    fragment.append(photo);
  });

  container.append(fragment);
};

export { renderPhotos };
