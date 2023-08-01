import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { setEffectsSlider } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './form-message.js';

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
const MAX_HASHTAGS_QUANTITY = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

// Текст для кнопки публикации
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

// Сообщения валидатора об ошибках
const INVALID_SYMBOLS_ERROR = 'В хэштеге использованы недопустимые символы';
const INVALID_QUANTITY_ERROR = 'Максимум 5 хэштегов';
const UNUNIQUE_TAGS_ERROR = 'Такой хэштег уже есть';

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
  document.removeEventListener('keydown', onFormKeydown);
  hashtagField.removeEventListener('keyup', onTextKeyUp);
  descriptionField.removeEventListener('keyup', onTextKeyUp);
};

// Отмена закрытия модалки при фокусе на текстовых полях
const cancelCloseModal = () => document.activeElement === hashtagField || document.activeElement === descriptionField;

// Функция-обработчик нажатия Escape
function onFormKeydown(evt) {
  if (evt.key === 'Escape' && !cancelCloseModal()) {
    evt.preventDefault();
    hideModalForm();
  }
}

// Функция для нормализации хэштега- обрезаем лишние пробелы и пустые строки в массиве хэштегов
const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

// Проверка на валидность символов
const isValidSymbols = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

// Проверка на количество хэштегов
const isValidQuantity = (value) => normalizeTags(value).length <= MAX_HASHTAGS_QUANTITY;

// Проверка на уникальность хэштегов
const isUniqueTag = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

// Валидаторы хэштегов
pristine.addValidator(
  hashtagField,
  isValidSymbols,
  INVALID_SYMBOLS_ERROR,
  2,
  true
);

pristine.addValidator(
  hashtagField,
  isValidQuantity,
  INVALID_QUANTITY_ERROR,
  3,
  true
);

pristine.addValidator(
  hashtagField,
  isUniqueTag,
  UNUNIQUE_TAGS_ERROR,
  1,
  true
);

function onTextKeyUp() {
  if (isValidSymbols(hashtagField.value) && isValidQuantity(hashtagField.value) &&
  isUniqueTag(hashtagField.value) && descriptionField.value.length < 141) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Действия при открытии модального окна формы
const showModalForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onFormKeydown);
  setEffectsSlider();
  hashtagField.addEventListener('keyup', onTextKeyUp);
  descriptionField.addEventListener('keyup', onTextKeyUp);
};

// При клике на кнопку загрузки файла
const onUploadFieldChange = () => {
  showModalForm();
};

// При клике на кнопку закрытия формы
const onCancelButtonClick = () => {
  hideModalForm();
};


// Заблокировать / разблокировать кнопку публикациии
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Обработчик клика на кнопку загрузки файла
uploadField.addEventListener('change', onUploadFieldChange);
// Обработчик клика на кнопку закрытия формы
cancelButton.addEventListener('click', onCancelButtonClick);

// Отправка данных
const sendingData = async (data) => {
  try {
    await sendData(data);
    hideModalForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

// При нажатии на кнопку публикации
form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(form);
    await sendingData(formData);
    unblockSubmitButton();
  }
});

export {hideModalForm, unblockSubmitButton, onFormKeydown};
