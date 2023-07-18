// Находим элементы полноэкранного фото
const photoModalElement = document.querySelector('.big-picture');
const commentCountElement = document.querySelector('.comments-count');
const commentShownElement = document.querySelector('.comments-shown');
const commentListElement = photoModalElement.querySelector('.social__comments');
const commentsLoaderElement = photoModalElement.querySelector('.comments-loader');
const cancelButtonElement = photoModalElement.querySelector('.big-picture__cancel');
const commentElement = photoModalElement.querySelector('.big-picture__social').querySelector('.social__comment');
const bodyElement = document.querySelector('body');

// Количество комментариев для показа
const commentsForShow = 5;

// Массив и количество отображенных комментариев перед открытием фото
let commentsShown = 0;
let comments = [];

// Функция для закрытия полноэкранного фото
const hideModalPhoto = () => {
  photoModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
};

// Функция-обработчик нажатия Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideModalPhoto();
  }
}

// Обработчик клика на кнопку закрытия полноэкранного фото
const onCancelButtonClick = () => hideModalPhoto();

// Функция для показа деталей фото
const renderPhotoData = ({url, likes, description}) => {

  photoModalElement.querySelector('.big-picture__img img').src = url;
  photoModalElement.querySelector('.big-picture__img img').alt = description;
  photoModalElement.querySelector('.social__caption').textContent = description;
  photoModalElement.querySelector('.likes-count').textContent = likes;
};

// Функция для показа данных комментария
const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

// Функция для показа комментариев
const renderComments = () => {
  commentsShown += commentsForShow;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentShownElement.textContent = commentsShown;
  commentCountElement.textContent = comments.length;
};

// Обработчик кнопки для дозагрузки комментариев
const onCommentsLoaderClick = () => renderComments(comments);

// Функция для показа полноэкранного фото
const showModalPhoto = (data) => {
  photoModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentCountElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPhotoData(data);
  comments = data.comments;

  if (comments.length > 0) {
    renderComments(comments);
  }
};

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showModalPhoto };
