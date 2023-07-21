// Установки для масштабирования изображения
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

// Элементы, необходимые для работы с масштабированием
const modalElement = document.querySelector('.img-upload');
const plusButton = modalElement.querySelector('.scale__control--bigger');
const minusButton = modalElement.querySelector('.scale__control--smaller');
const scaleValue = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

