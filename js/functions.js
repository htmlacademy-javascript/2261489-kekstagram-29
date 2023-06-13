// Функция для проверки длины строки

const stringLength = (string, length) => string.length <= length;

// Функция для проверки строки на палиндромность

const isPalindrome = function (string) {
  const normalizedString = string.toLowerCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    const index = normalizedString[i];
    newString += index;
  }
  return normalizedString === newString;
};

// Функция для извлечения чисел

const extractNumbers = function (string) {
  let newString = '';

  for (let i = 0; i <= string.length; i++) {
    const insert = parseInt(string[i], 10);
    if (!isNaN(insert)) {
      newString += insert;
    }
  }
  return newString ? parseInt(newString, 10) : NaN;
};
