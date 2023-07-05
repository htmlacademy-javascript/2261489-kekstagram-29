import {getRandomNumber} from './util.js';
import {getUniqueNumber} from './util.js';

// Имена
const names = [
  'Рамзан',
  'Магомед',
  'Хабиб',
  'Джабраил',
  'Мустафа',
  'Ахмат',
  'Асланбек',
  'Гаджибек',
  'Ислам',
  'Гаджимурад',
  'Саид',
  'Ибрагим',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Генератор комментариев
const getMessage = () => messages[getRandomNumber(0, messages.length - 1)];
getMessage();

// Генератор аватаров
const getAvatar = () => `img/avatar-${getRandomNumber(1, 6)}.svg`;
getAvatar();

// Генератор id
const getId = () => (uniqueId => uniqueId())(getUniqueNumber(1, 15570));
getId();

// Комментарий
let getComment = function () {
  return {
    id: getId(),
    avatar: getAvatar(),
    message: getMessage(),
    name: names[getRandomNumber(0, names.length - 1)],
  };
};

const getPhotoId = getUniqueNumber(1, 25);
const getUrl = function () {
  return `photos/${getRandomNumber(1, 25)}.jpg`;
};
const getLikes = function () {
  return getRandomNumber(15, 200);
};


// Описание фотографии
const createPhotoPage = function () {
  return {
    photoId: getPhotoId(),
    url: getUrl(),
    description: 'Фотка жи есть',
    likes: getLikes(),
    comments: Array.from({length: getRandomNumber(0, 30)}, getComment),
  };
};

const photoPage = createPhotoPage();

// // Массив из 25 объектов
const getPhotos = () => Array.from({length: 25})
  .map((_, photoIndex) => createPhotoPage(photoIndex + 1));

export { photoPage, getPhotos };
