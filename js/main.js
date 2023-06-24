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

// Генератор случайных чисел
const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomNumber();

// Генератор неповторяющихся чисел
const getUniqueNumber = function (min, max) {
  const usedNumbers = [];

  return function () {
    let currentNumber = getRandomNumber (min, max);

    while (usedNumbers.includes(currentNumber)) {
      currentNumber = getRandomNumber(min, max);
    }
    usedNumbers.push(currentNumber);
    return currentNumber;
  };
};
getUniqueNumber();

// Генератор комментариев
const getMessage = function () {
  let message = messages[getRandomNumber(0, messages.length - 1)];
  return message;
};
getMessage();

// Генератор аватаров
const getAvatar = function () {
  const avatar = `img/avatar-${getRandomNumber(1, 6)}.svg`;
  return avatar;
};
getAvatar();

// Генератор id
const getId = function () {
  const uniqueId = getUniqueNumber(1, 15570);
  const id = uniqueid();
  return id;
};
getId();

// Комментарий
let getComment = function () {
  return {
    id: getId(),
    avatar: getAvatar(),
    message: getMessage(),
    name: NAMES[getRandomNumber(0, NAMES.length - 1)],
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
let createPhotoPage = function () {
  return {
    photoId: getPhotoId(),
    url: getUrl(),
    description: 'Фотка жи есть',
    likes: getLikes(),
    comments: Array.from({length: getRandomNumber(0, 30)}, getComment),
  };
};

// // Массив из 25 объектов
let photoPages = Array.from({length: 25}, createPhotoPage);
console.log(photoPages);
