
// Находим содержимое шаблона и записываем в переменную
const photoTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

// Находим контейнер, куда сложим отрисованные фото
const container = document.querySelector('.pictures');

// Создаём отдельный элемент- фото
const createPhoto = ({ url, description, likes, comments }) => {
  const photo = photoTemplate.cloneNode(true);

  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__img').alt = description;
  photo.querySelector('.picture__likes').textContent = likes;
  photo.querySelector('.picture__comments').textContent = comments.length;

  return photo;
};

console.log(createPhoto(photoPage));

export {createPhoto};
