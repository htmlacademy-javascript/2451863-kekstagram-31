const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить данные',
};

const SuccessMessage = 'Изображение успешно загружено';

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

const getData = () => load(Route.GET_DATA, ErrorMessage.GET_DATA);

const sendData = (body) => load (Route.SEND_DATA, ErrorMessage.SEND_DATA, 'POST', body);

export {getData, sendData, ErrorMessage, SUCCESS_MESSAGE};
