// Адрес сервера
const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

// Маршруты получения и отправки данных на сервер
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Методы взвимодействия с сервером
const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Сообщения получения и отправки данных на сервер
const ErrorText = {
  GET_DATA: 'Ошибка загрузки данных. Попробуйте обновить страницу.',
  SEND_DATA: 'Ошибка отправки данных. Попробуйте повторить попытку.',
};

// Универсальная функция-загрузик
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

// Функция для получения данных с сервера
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

// Функция для отправки данных на сервер
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
