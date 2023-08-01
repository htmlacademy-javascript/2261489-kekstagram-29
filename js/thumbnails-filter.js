import { renderPhotos } from './thumbnails.js';
import { debounce } from './util.js';

// Количество случайных фото при сортировке
const PHOTOS_COUNT = 10;

// Задержка отрисовки миниатюр после смены фильтра
const TIMEOUT = 500;

// Элементы в разметке
const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

// Кнопки фильтра
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Показать фильтр
const showFilters = () => filters.classList.remove('img-filters--inactive');

// Сортировка в случайном порядке
const sortRandomly = () => Math.random() - 0.5;

// Сортировка по количеству комментариев
const sortDiscussed = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

// Фильтрация фото
const getFilteredPhotos = (pictures, sortButton) => {

  if (sortButton === filterDefault) {
    return pictures;
  }

  if (sortButton === filterRandom) {
    return pictures.slice().sort(sortRandomly).slice(0, PHOTOS_COUNT);
  }

  if (sortButton === filterDiscussed) {
    return pictures.slice().sort(sortDiscussed);
  }
};

// Очистка миниатюр при смене фильтра
const removePictures = () => document.querySelectorAll('.picture').forEach((thumbnail) => thumbnail.remove());

const setOnFilterClick = (evt, pictures) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));

  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');

  removePictures();
  renderPhotos(getFilteredPhotos(pictures, filterButton));
};

const setDebouncedFilter = (pictures) => {
  filtersForm.addEventListener('click', debounce((evt) => {
    setOnFilterClick(evt, pictures);
  }, TIMEOUT));
};

export {showFilters, setDebouncedFilter};
