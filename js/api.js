const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ERROR_MESSAGE_SHOW_TIME = 5000;

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить данные',
};

const showGetDataErrorMessage = (errorMessageText) => {
  const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageTitle = errorMessage.querySelector('.data-error__title');
  errorMessageTitle.textContent = errorMessageText;
  document.body.append(errorMessage);

  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_MESSAGE_SHOW_TIME);
};

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

const sendData = (body) => load(Route.SEND_DATA, ErrorMessage.SEND_DATA, 'POST', body);

export {getData, sendData, showGetDataErrorMessage, ErrorMessage};
