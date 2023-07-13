// Находим элементы полноэкранного фото
const photoModalElement = document.querySelector('.big-picture');
const commentCountElement = document.querySelector('.social__comment-count');
const commentListElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.social__comments-loader');
const cancelButtonElement = document.querySelector('.big-picture__cancel');
const commentElement = document.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');


// Функция для закрытия полноэкранного фото
function hideModalPhoto = () => {
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

};

function onCancelButtonClick = () => {
  hideModalPhoto();
};

// Функция для показа полноэкранного фото
function showModalPhoto = (data) => {
  photoModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.add('hidden');
  commentCountElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);


};


cancelButtonElement.addEventListener('click', onCancelButtonClick)
