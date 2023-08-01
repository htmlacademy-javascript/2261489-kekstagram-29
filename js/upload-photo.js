// Допустимые форматы загружаемых файлов фото
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Элементы загрузки фото
const fileChooser = document.querySelector('.img-upload__input[type=file]');
const photoPreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

// Проверка валидности имени файла
const isValidFileName = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const setPreviewPictureListener = () => {
  fileChooser.addEventListener ('change', () => {
    const file = fileChooser.files[0];

    if (file && isValidFileName) {
      photoPreview.src = URL.createObjectURL(file);
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url('${photoPreview.src}')`;
      });
    }
  });
};

export {setPreviewPictureListener};
