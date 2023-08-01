// Шаблон фото
const photoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

// Контейнер для сгенерированных фото
const container = document.querySelector('.pictures');

// Отрисовка на странице миниатюр
const renderPhotos = (pictures) => {
  document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());
  const fragment = document.createDocumentFragment();

  pictures.forEach(({url, likes, description, comments, id}) => {
    const photo = photoTemplate.cloneNode(true);

    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__img').alt = description;
    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;
    photo.dataset.id = id;

    // const photo = createPhoto(picture);
    fragment.append(photo);
  });

  container.append(fragment);
};

export { renderPhotos };
