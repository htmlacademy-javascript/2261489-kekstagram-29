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

export {getRandomNumber, getUniqueNumber};
