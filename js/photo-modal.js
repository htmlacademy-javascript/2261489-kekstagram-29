// Находим элементы полноэкранного фото
const photoModalElement = document.querySelector('.big-picture');
const commentCountElement = document.querySelector('.social__comment-count');
const commentListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.big-picture__social').querySelector('.social__comment');
const bodyElement = document.querySelector('body');


// Функция для закрытия полноэкранного фото
const hideModalPhoto = () => {
  photoModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция-обработчик нажатия Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideModalPhoto();
  }
}

// Обработчик клика на кнопку закрытия полноэкранного фото
const onCancelButtonClick = () => {
  hideModalPhoto();
};

// Функция для показа деталей фото
const renderPhotoData = ({ url, description, likes }) => {
  photoModalElement.querySelector('.big-picture__img img').src = url;
  photoModalElement.querySelector('.big-picture__img img').alt = description;
  photoModalElement.querySelector('.social__caption').textContent = description;
  photoModalElement.querySelector('.likes-count').textContent = likes;
};

// Функция для показа данных комментария
const createComment = ({ avatar, name, message}) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// Функция для показа комментариев
const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
};

// Функция для показа полноэкранного фото
const showModalPhoto = (data) => {
  photoModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoData(data);
  renderComments(data.comments);
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);

export { showModalPhoto };
