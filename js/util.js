// // Генератор случайных чисел
// const getRandomNumber = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };
// getRandomNumber();

// // Генератор неповторяющихся чисел
// const getUniqueNumber = function (min, max) {
//   const usedNumbers = [];

//   return function () {
//     let currentNumber = getRandomNumber (min, max);

//     while (usedNumbers.includes(currentNumber)) {
//       currentNumber = getRandomNumber(min, max);
//     }
//     usedNumbers.push(currentNumber);
//     return currentNumber;
//   };
// };
// getUniqueNumber();

// Время показа сообщения об ошибке отправки формы
const ALERT_SHOW_TIME = 5000;

// Cообщениe об ошибке отправки формы
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Устранение дребезга при перерисовке миниатюр
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlert, debounce};
