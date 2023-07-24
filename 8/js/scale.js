// Установки для масштабирования изображения
const minScale = 25;
const maxScale = 100;
const scaleStep = 25;
const defaultScale = 100;

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
  const newValue = currentValue + scaleStep;
  if (newValue > maxScale) {
    scaleImage(maxScale);
  } else {
    scaleImage(newValue);
  }
};

const onMinusButtonClick = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue - scaleStep;
  if (newValue < minScale) {
    scaleImage(minScale);
  } else {
    scaleImage(newValue);
  }
};

// Сброс масштаба
const resetScale = () => scaleImage(defaultScale);

// Обработчики клика на +/-
plusButton.addEventListener('click', onPlusButtonClick);
minusButton.addEventListener('click', onMinusButtonClick);

export { resetScale };
