const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ERROR_MESSAGE = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить данные',
};

const SUCCESS_MESSAGE = 'Изображение успешно загружено';

const load = (route, errorMessage, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => load(ROUTE.GET_DATA, ERROR_MESSAGE.GET_DATA);

const sendData = (body) => load (ROUTE.SEND_DATA, ERROR_MESSAGE.SEND_DATA, 'POST', body);

export {getData, sendData, ERROR_MESSAGE, SUCCESS_MESSAGE};
