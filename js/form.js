// Элементы, нобходимые для работы с формой
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const uploadField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');

// Правила для валидации хэштегов
const maxHashtagsQuantity = 5;
const validSymbols = /^#[a-zа-яё0-9]{1,19}$/i;


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

// Отмена закрытия модалки при фокусе на текстовых полях
const cancelCloseModal = () => document.activeElement === hashtagField || document.activeElement === descriptionField;

// Функция-обработчик нажатия Escape
function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !cancelCloseModal()) {
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

// Функция для нормализации хэштега- обрезаем лишние пробелы и пустые строки в массиве хэштегов
const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

// Проверка на валидность символов
const isValidSymbols = (value) => normalizeTags(value).every((tag) => validSymbols.test(tag));

// Проверка на количество хэштегов
const isValidQuantity = (value) => normalizeTags(value).length <= maxHashtagsQuantity;

// Проверка на уникальность хэштегов
const isUniqueTag = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
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
uploadField.addEventListener('click', onUploadFieldClick);
// Обработчик клика на кнопку закрытия формы
cancelButton.addEventListener('click', onCancelButtonClick);
