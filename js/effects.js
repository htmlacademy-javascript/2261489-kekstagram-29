// Массив с параметрами эффектов для изображения
const effects = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const defaultEffect = effects[0];
let chosenEffect = defaultEffect;

// Элементы, необходимые для работы с эффектами
const imageElement = document.querySelector('.img-upload__preview img');
const effectsElement = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
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
    start: chosenEffect.max,
    step: chosenEffect.step,
  });

  if (isDefault()){
    hideSlider();
  } else {
    showSlider();
  }
};

// Смена эффекта
const onEffectsChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }

  chosenEffect = effects.find((effect) => effect.name === evt.target.value);
  imageElement.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

// Обновление эффекта при движении слайдера
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectValue.value = sliderValue;

  if (isDefault()) {
    imageElement.style.filter = defaultEffect.filter;
  } else {
    imageElement.style.filter = `${chosenEffect.filter}(${sliderValue}${chosenEffect.unit})`;
  }
};

// Сброс эффектов
const resetEffects = () => {
  chosenEffect = defaultEffect;
  updateSlider();
};

// Создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.max,
  step: defaultEffect.step,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Обработчики изменений слайдера и эффекта
const setEffectsSlider = () => {
  effectsElement.addEventListener('change', onEffectsChange);
  sliderElement.noUiSlider.on('update', onSliderUpdate);
};


export { resetEffects, setEffectsSlider };
