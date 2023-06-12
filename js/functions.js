// Функция для проверки длины строки

const stringLength = (string, length) => {
  console.log(string.length <= length);
}

// Тест:
// Строка длиннее
stringLength('some string', 5);
// Строка короче
stringLength('some string', 22);
stringLength('js', 6);
// Строка равна
stringLength('any string', 10);


