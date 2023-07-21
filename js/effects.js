// Массив с параметрами эффектов для изображения
const effects = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const defaultEffect = effects.none;
let chosenEffect = defaultEffect;

// Элементы, необходимые для работы с эффектами
const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');

// Проверка на отсутствие фильтра
const isDefault = () => chosenEffect === defaultEffect;

// Показ слайдера
const showSlider = () => sliderContainer.classList.remove('hidden');

// Скрытие слайдера
const hideSlider = () => sliderContainer.classList.add('hidden');

// Обновление слайдера
const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};

// Создание слайдера
const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: defaultEffect.min,
      max: defaultEffect.max,
    },
    start: defaultEffect.max,
    step: defaultEffect.step,
    connect: 'lower',
  });

  if (isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};
