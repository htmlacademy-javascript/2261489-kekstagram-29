// Функция для проверки длины строки

const stringLength = (string, length) => {
  console.log(string.length <= length);
};

// Тест:
// Строка длиннее
stringLength('some string', 5);
// Строка короче
stringLength('some string', 22);
stringLength('js', 6);
// Строка равна
stringLength('any string', 10);

// Функция для проверки строки на палиндромность

const isPalindrome = function (string) {
  const normalizedString = string.toLowerCase();
  let newString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    const index = normalizedString[i];
    newString += index;
  }
  console.log(normalizedString === newString);
};

// Тест
// Палиндромы
isPalindrome('Тот');
isPalindrome('LevEl');
// Не палиндромы
isPalindrome('Торт');
isPalindrome('palindrome');


