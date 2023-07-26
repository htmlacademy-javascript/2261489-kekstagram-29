import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { setEffectsSlider } from './effects.js';

// Элементы, нобходимые для работы с формой
const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');
const uploadField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');

// Правила для валидации хэштегов
const maxHashtagsQuantity = 5;
const validSymbols = /^#[a-zа-яё0-9]{1,19}$/i;

// Сообщения валидатора об ошибках
const invalidSymbolsError = 'В хэштеге использованы недопустимые символы';
const invalidQuantityError = 'Максимум 5 хэштегов';
const ununiqueTagsError = 'Такой хэштег уже есть';

// Добавление библиотеки-валидатора Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  // errorClassText: 'img-upload__field-wrapper--error',
});

// Действия при закрытии модального окна формы
const hideModalForm = () => {
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagField.removeEventListener('keyup', onTextKeyUp);
  descriptionField.removeEventListener('keyup', onTextKeyUp);
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

// Валидаторы хэштегов
pristine.addValidator(
  hashtagField,
  isValidSymbols,
  invalidSymbolsError,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  isValidQuantity,
  invalidQuantityError,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  isUniqueTag,
  ununiqueTagsError,
  1,
  true
);

// Функция блокировки кнопки публикации при невалидных хэштегах
function onTextKeyUp() {
  if (isValidSymbols(hashtagField.value) && isValidQuantity(hashtagField.value) &&
  isUniqueTag(hashtagField.value) && descriptionField.value.length < 141 && descriptionField.value.length >= 1) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Действия при открытии модального окна формы
const showModalForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  setEffectsSlider();
  hashtagField.addEventListener('keyup', onTextKeyUp);
  descriptionField.addEventListener('keyup', onTextKeyUp);
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
