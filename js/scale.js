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

//Масштабирование изображения
const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

//Увеличение и уменьшение масштаба изображения при клике
const onPlusButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    scaleImage(MAX_SCALE);
  } else {
    scaleImage(newValue);
  }
};

const onMinusButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    scaleImage(MIN_SCALE);
  } else {
    scaleImage(newValue);
  }
};

// Сброс масштаба
const resetScale = () => scaleImage(DEFAULT_SCALE);

// Обработчики клика на +/-
plusButton.addEventListener('click', onPlusButtonClick);
minusButton.addEventListener('click', onMinusButtonClick);

export { resetScale };
