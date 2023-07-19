// Элементы, нобходимые для работы с формой
const body = document.querySelector('body');
const form = document.querySelector('.form');
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

