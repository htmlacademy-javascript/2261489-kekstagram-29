// Элементы, нобходимые для работы с формой
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const uploadField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');

// Добавление библиотеки-валидатора Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClassText: 'img-upload__field-wrapper--error',
});


// Действия при закрытии модального окна формы
const hideModalForm = () => {
  form.reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Функция-обработчик нажатия Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideModalForm();
  }
}

// Действия при открытии модального окна формы
const showModalForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

// При клике на кнопку загрузки файла
const onUploadFieldClick = () => {
  showModalForm();
};

// При клике на кнопку закрытия формы
const onCancelButtonClick = () => {
  hideModalForm();
};

// Обработчик клика на кнопку загрузки файла
uploadField.addEventListener('click', onUploadFieldClick)
// Обработчик клика на кнопку закрытия формы
cancelButton.addEventListener('click', onCancelButtonClick);
